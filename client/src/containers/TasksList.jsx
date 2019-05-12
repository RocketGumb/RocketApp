import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { updateTask, addTask, deleteTask } from "../actions/taskActions";
import TaskItem from "../components/tasks/TaskItem";
import Modal from "./Modal";
// Form for add task
import FormToAdd from "../components/FormToAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

// Output & work with tasks
class TasksList extends Component {
	state = {
		priorityIsOpen: null,
		sortMethod: null,
		modalIsOpen: false,
		currentTask: {
			id: "",
			title: "",
			users: [],
			executor: ""
		}
	};

	// Add task
	addTask = event => {
		event.preventDefault();
		const email = this.props.user.email,
			title = event.target.title.value;
		let project = "";

		if (this.props.project) project = this.props.project;
		if (title) {
			this.props.addTask(email, title, project);
			event.target.title.value = "";
		}
	};

	// Delete task and close modal open
	deleteTask = id => {
		this.props.deleteTask(id);
		this.setState({
			modalIsOpen: false
		});
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

	// Change executor for task
	executorChange = (id, user) => {
		const data = {
			executor: user
		};
		this.setState({
			currentTask: {
				...this.state.currentTask,
				executor: user
			}
		});
		this.props.updateTask(id, data);
	};

	// Change the title of the task
	titleChange = event => {
		event.preventDefault();
		const id = event.target.id.value;
		const data = {
			title: event.target.title.value
		};
		if (data.title) {
			this.props.updateTask(id, data);
			this.setState({
				modalIsOpen: false
			});
		}
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

	// Open modal window for edit task
	modalOpen = (id, title, project, executor) => {
		let users = [];
		let currentExecutor = "";
		if (project) {
			const projectTask = this.props.projects.find(
				theProject => theProject.id === project
			);
			users = projectTask.users;
		}
		if (executor) {
			currentExecutor = executor;
		}
		this.setState({
			modalIsOpen: true,
			currentTask: {
				id,
				title,
				users,
				executor: currentExecutor
			}
		});
	};

	// Close modal window
	modalClose = () => {
		this.setState({
			modalIsOpen: false
		});
	};

	render() {
		// Get active tasks
		const { tasks, executorOn } = this.props;
		// Get info to current task for edit
		const { currentTask } = this.state;
		return (
			<div className="content_block content_block__big">
				<div className="content_block_title h2">
					Задачи
					{executorOn && (
						<span className="content_block_executor">Исполнитель</span>
					)}
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
						{tasks.length && executorOn ? (
							tasks
								.sort(this.compare)
								.map(({ id, title, priority, project, executor }) => (
									<TaskItem
										key={id}
										priorityChange={this.priorityChange}
										priorityIsOpen={this.state.priorityIsOpen}
										togglePriorityWindow={this.togglePriorityWindow.bind(
											this,
											id
										)}
										completeTask={this.completeTask}
										payload={{ id, title, priority, project, executor }}
										modalOpen={this.modalOpen}
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
				{this.state.modalIsOpen && (
					<Modal title="Редактировать задачу" modalClose={this.modalClose}>
						<form onSubmit={this.titleChange}>
							<label>
								Название
								<input
									type="text"
									name="title"
									defaultValue={currentTask.title}
								/>
							</label>
							{currentTask.users.length > 0 ? (
								<Fragment>
									<p className="overlay__wrapper_subtitle">
										Выберите исполнителя
									</p>
									<ul className="overlay__wrapper_list">
										{currentTask.users.map(user => (
											<li
												onClick={this.executorChange.bind(
													this,
													currentTask.id,
													user
												)}
												className={
													currentTask.executor === user ? "active" : ""
												}
												key={user}
											>
												{user}
											</li>
										))}
									</ul>
								</Fragment>
							) : (
								""
							)}
							<input type="hidden" value={currentTask.id} name="id" />
							<button
								type="button"
								onClick={this.modalClose}
								className="overlay_btn overlay_btn__close"
							>
								Закрыть
							</button>
							<button
								type="button"
								onClick={this.deleteTask.bind(this, currentTask.id)}
								className="overlay_btn overlay_btn__delete"
							>
								Удалить
							</button>
							<button type="submit" className="overlay_btn overlay_btn__save">
								Сохранить
							</button>
						</form>
					</Modal>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		projects: state.project.projects
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateTask: (id, data) => dispatch(updateTask(id, data)),
		addTask: (email, title, project) =>
			dispatch(addTask(email, title, project)),
		deleteTask: id => dispatch(deleteTask(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TasksList);
