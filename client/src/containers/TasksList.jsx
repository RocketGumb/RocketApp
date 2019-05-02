import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { updateTask, addTask } from "../actions/taskActions";
import TaskItem from "../components/tasks/TaskItem";
// Form for add task
import FormToAdd from "../components/FormToAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

// Output & work with tasks
class TasksList extends Component {
	state = {
		priorityIsOpen: null,
		sortMethod: null
	};

	// Add task
	addTask = event => {
		event.preventDefault();

		const id = this.props.user._id,
			title = event.target.title.value;

		let project = "";

		if (this.props.project) project = this.props.project;

		console.log("project", project);

		if (title) {
			this.props.addTask(id, title, project);
			event.target.title.value = "";
		}
	};

	// Complete task
	completeTask = event => {
		const id = event.target.value;
		const data = {
			completed: true
		};
		this.props.updateTask(id, data);
	};

	// Change priority for task
	priorityChange = event => {
		const id = event.target.name;
		const data = {
			priority: event.target.value
		};
		this.props.updateTask(id, data);
	};

	// Show & hide the window for change priority
	togglePriorityWindow(id) {
		if (this.state.priorityIsOpen === id) id = null;
		this.setState({
			priorityIsOpen: id
		});
	}

	// Sorting tasks
	sortTasks = event => {
		this.setState({
			sortMethod: event.target.dataset.sort
		});
	};

	compare = (firstTask, secondTask) => {
		switch (this.state.sortMethod) {
			case "priority":
				return secondTask.priority - firstTask.priority;
			case "word":
				firstTask = firstTask.title.toLowerCase();
				secondTask = secondTask.title.toLowerCase();
				return firstTask.localeCompare(secondTask, "base", {
					ignorePunctuation: true
				});
			default:
				return;
		}
	};

	render() {
		// Get active tasks
		let tasks = this.props.tasks;
		tasks = tasks.filter(task => !task.completed);
		return (
			<div className="content_block content_block__big">
				<div className="content_block_title h2">
					Входящие задачи
					<div
						className="content_block_title_setting"
						onClick={this.togglePriorityWindow.bind(this, "sort")}
					>
						<FontAwesomeIcon icon={faEllipsisV} />

						<ReactCSSTransitionGroup
							className="sortTask"
							transitionName="fadeIn"
							transitionEnterTimeout={300}
							transitionLeaveTimeout={100}
						>
							{this.state.priorityIsOpen === "sort" && (
								<div className="prioritySort">
									<p data-sort="priority" onClick={this.sortTasks}>
										По приоритету
									</p>
									<p data-sort="word" onClick={this.sortTasks}>
										По алфавиту
									</p>
								</div>
							)}
						</ReactCSSTransitionGroup>
					</div>
				</div>
				<ul className="tasks-list">
					<ReactCSSTransitionGroup
						transitionName="fadeIn"
						transitionEnterTimeout={400}
						transitionLeaveTimeout={200}
					>
						{tasks.length ? (
							tasks
								.sort(this.compare)
								.map(({ id, title, priority }) => (
									<TaskItem
										key={id}
										priorityChange={this.priorityChange}
										priorityIsOpen={this.state.priorityIsOpen}
										togglePriorityWindow={this.togglePriorityWindow.bind(
											this,
											id
										)}
										completeTask={this.completeTask}
										payload={{ id, title, priority }}
									/>
								))
						) : (
							<li className="tasks-list_item">
								<p className="tasks-list_item__title">Нет активных задач</p>
							</li>
						)}
					</ReactCSSTransitionGroup>
				</ul>
				<FormToAdd add={this.addTask} placeholder="Добавить задачу..." />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTask: (id, data) => dispatch(updateTask(id, data)),
		addTask: (id, title, project) => dispatch(addTask(id, title, project))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(TasksList);
