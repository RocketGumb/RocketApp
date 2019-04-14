import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { getTasks, updateTask, addTask } from "../actions/taskActions";
import TaskItem from "../components/tasks/TaskItem";
// Form for add task
import AddTask from "../components/tasks/AddTask";

// Output & work with tasks
class TasksList extends Component {
	state = {
		buttonIsActive: false,
		priorityIsOpen: null
	};

	// Show & hide the button for add a task
	addButtonToggle() {
		this.setState({
			buttonIsOpen: !this.state.buttonIsOpen
		});
	}

	// Output tasks
	componentDidMount() {
		if (this.props.user) {
			const id = this.props.user._id;
			this.props.getTasks(id);
		}
	}

	componentDidUpdate(prevProps) {
		const { user } = this.props;
		if (user !== prevProps.user) {
			this.props.getTasks(user._id);
		}
	}

	// Add task
	addTask(event) {
		event.preventDefault();

		const id = this.props.user._id,
			title = event.target.title.value;

		if (title) {
			this.props.addTask(id, title);
			event.target.title.value = "";
		}
	}

	// Delete task
	deleteTask(event) {
		const id = event.target.value;
		const data = {
			completed: true
		};
		this.props.updateTask(id, data);
	}

	// Change priority for task
	priorityChange(event) {
		const id = event.target.name;
		const data = {
			priority: event.target.value
		};
		this.props.updateTask(id, data);
	}

	// Show & hide the window for change priority
	togglePriorityWindow(id) {
		if (this.state.priorityIsOpen === id) id = null;
		this.setState({
			priorityIsOpen: id
		});
	}

	render() {
		const { tasks } = this.props.task;
		return (
			<div className="content_block content_block__big">
				<AddTask
					addTask={this.addTask.bind(this)}
					buttonIsOpen={this.state.buttonIsOpen}
					addButtonShow={this.addButtonToggle.bind(this)}
					addButtonHide={this.addButtonToggle.bind(this)}
				/>
				<ul className="tasks-list">
					<ReactCSSTransitionGroup
						transitionName="fadeIn"
						transitionEnterTimeout={400}
						transitionLeaveTimeout={400}
					>
						{tasks.map(
							({ id, title, priority, completed }) =>
								!completed && (
									<TaskItem
										key={id}
										priorityChange={this.priorityChange.bind(this)}
										priorityIsOpen={this.state.priorityIsOpen}
										togglePriorityWindow={this.togglePriorityWindow.bind(
											this,
											id
										)}
										deleteTask={this.deleteTask.bind(this)}
										payload={{ id, title, priority }}
									/>
								)
						)}
					</ReactCSSTransitionGroup>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		task: state.task,
		user: state.auth.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: id => dispatch(getTasks(id)),
		updateTask: (id, data) => dispatch(updateTask(id, data)),
		addTask: (id, title) => dispatch(addTask(id, title))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TasksList);
