import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { updateTask } from "../actions/taskActions";
import TaskCompleteItem from "../components/tasks/TaskCompleteItem";

// Output & work with tasks
class TaskCompleteList extends Component {
	// Return task to the inbox
	activateTask = event => {
		const id = event.target.value;
		const data = {
			completed: false
		};
		this.props.updateTask(id, data);
	};

	render() {
		// Get completed tasks
		let tasks = this.props.tasks;
		tasks = tasks.filter(task => task.completed);

		return (
			<div className="content_block content_block__big">
				{!tasks.length ? (
					<div className="content_block_title">
						Отсутствуют выполненные задачи
					</div>
				) : (
					<ReactCSSTransitionGroup
						transitionName="fadeIn"
						transitionEnterTimeout={400}
						transitionLeaveTimeout={400}
					>
						<div className="content_block_title h2">Выполненные задачи</div>
						<ul className="tasks-list">
							{tasks.map(
								({ id, title }, index) =>
									index < 10 && (
										<TaskCompleteItem
											key={id}
											payload={{ id, title }}
											activateTask={this.activateTask}
										/>
									)
							)}
						</ul>
					</ReactCSSTransitionGroup>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTask: (id, data) => dispatch(updateTask(id, data))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(TaskCompleteList);
