import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { getTasks, addTask, deleteTask } from "../actions/taskActions";
// Form for add task
import AddTask from "../components/AddTask";

// Output and work with tasks
class TasksList extends Component {
	state = {
		buttonIsActive: false
	};

	// Show and hide the button for add a task
	addButtonToggle = () => {
		this.setState({
			buttonIsOpen: !this.state.buttonIsOpen
		});
	};

	// Output tasks
	componentDidMount() {
		this.props.getTasks();
	}

	render() {
		const { tasks } = this.props.task;
		return (
			<div className="content_block content_block__big">
				<AddTask
					addTask={this.props.addTask}
					buttonIsOpen={this.state.buttonIsOpen}
					addButtonShow={this.addButtonToggle}
					addButtonHide={this.addButtonToggle}
				/>
				<ul className="tasks-list">
					<ReactCSSTransitionGroup
						transitionName="fadeIn"
						transitionEnterTimeout={400}
						transitionLeaveTimeout={400}
					>
						{tasks.map(({ id, title }) => (
							<li key={id} className="tasks-list_item">
								<input
									type="radio"
									onChange={this.props.deleteTask}
									className="checkbox-template"
									value={id}
								/>
								<p>{title}</p>
							</li>
						))}
					</ReactCSSTransitionGroup>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { task: state.task };
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: () => dispatch(getTasks()),
		addTask: event => {
			event.preventDefault();
			const title = event.target.title.value;
			if (title) {
				dispatch(addTask(title));
				event.target.title.value = "";
			}
		},
		deleteTask: event => {
			const id = event.target.value;
			dispatch(deleteTask(id));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TasksList);
