import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { updateProject, deleteProject } from "../actions/projectActions";
// Components for work with tasks
import TasksList from "../containers/TasksList";
import TaskCompleteList from "../containers/TaskCompleteList";

class Project extends Component {
	state = {
		isOpen: {
			editor: false,
			members: false
		}
	};

	// Show modal window with editor to project
	editorShow = () => {
		this.setState({
			isOpen: {
				editor: true
			}
		});
	};

	// Show modal window with members to project
	membersShow = () => {
		this.setState({
			isOpen: {
				members: true
			}
		});
	};

	// Close all modal window
	modalClose = () => {
		this.setState({
			isOpen: {
				editor: false,
				members: false
			}
		});
	};

	projectUpdate = event => {
		event.preventDefault();
		const { title, desc } = event.target;

		const data = {
			title: title.value,
			desc: desc.value
		};
		// If the project name is not empty, save and close modal window
		if (data.title !== "") {
			this.props.updateProject(this.props.project.id, data);
			this.setState({
				isOpen: {
					editor: false
				}
			});
		}
	};

	// Add user to project
	addUser = event => {
		event.preventDefault();
		const { user } = event.target;
		const email = user.value;
		// For check email
		const reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
		const { project } = this.props;

		// Check email
		if (email && reg.test(email)) {
			let isError = false;
			console.log(project.users);
			project.users.forEach(user => {
				if (email === user) isError = true;
			});
			if (!isError) {
				const data = {
					user: email
				};
				this.props.updateProject(this.props.project.id, data);
				event.target.user.value = "";
			}
		}
	};

	// Delete user from project
	deleteUser = email => {
		const data = {
			deleteUser: email
		};
		this.props.updateProject(this.props.project.id, data);
	};

	// Delete project
	deleteProject = () => {
		this.props.deleteProject(this.props.project.id);
	};

	render() {
		const { project, user, projectID, tasks } = this.props;
		return (
			<Fragment>
				<div className="pagetitle">
					{project.title}
					<div className="pagetitle__setting">
						<FontAwesomeIcon icon={faUserPlus} onClick={this.membersShow} />
						<FontAwesomeIcon icon={faEllipsisH} onClick={this.editorShow} />
					</div>
				</div>
				<div className="breadcrumbs">
					<Link to="/all/projects" className="link">
						Проекты
					</Link>{" "}
					/ {project.title}
				</div>
				<div className="subtitle">{project.desc}</div>
				<section className="content_main">
					<TasksList
						user={user}
						project={projectID}
						tasks={tasks.filter(task => !task.completed)}
					/>
					<TaskCompleteList tasks={tasks.filter(task => task.completed)} />
				</section>
				{this.state.isOpen.editor && (
					<Modal title="Редактировать проект" modalClose={this.modalClose}>
						<form onSubmit={this.projectUpdate}>
							<label>
								Название
								<input type="text" name="title" defaultValue={project.title} />
							</label>
							<label>
								Описание (Максимум 200 символов)
								<textarea
									name="desc"
									maxLength="200"
									defaultValue={project.desc}
								/>
							</label>
							<button
								type="button"
								onClick={this.modalClose}
								className="overlay_btn overlay_btn__close"
							>
								Закрыть
							</button>
							<Link
								to="/all/projects"
								onClick={this.deleteProject}
								className="overlay_btn overlay_btn__delete"
							>
								Удалить
							</Link>
							<button type="submit" className="overlay_btn overlay_btn__save">
								Сохранить
							</button>
						</form>
					</Modal>
				)}
				{this.state.isOpen.members && (
					<Modal title="Добавить участников" modalClose={this.modalClose}>
						<p className="overlay__wrapper_subtitle">Список участников</p>
						<ul className="overlay__wrapper_list">
							{project.users.map((user, index) => (
								<li key={user}>
									{user}
									{index === 0 ? (
										<div className="overlay__wrapper_list_status">Владелец</div>
									) : (
										<button
											type="button"
											className="overlay__wrapper_list_delete"
											onClick={this.deleteUser.bind(this, user)}
										>
											Удалить
										</button>
									)}
								</li>
							))}
							<form onSubmit={this.addUser}>
								<label>
									Добавить участника
									<input
										type="email"
										name="user"
										placeholder="Почта участника"
									/>
								</label>
								<button
									type="button"
									onClick={this.modalClose}
									className="overlay_btn overlay_btn__close"
								>
									Закрыть
								</button>
								<button type="submit" className="overlay_btn overlay_btn__add">
									Добавить
								</button>
							</form>
						</ul>
					</Modal>
				)}
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateProject: (id, data) => dispatch(updateProject(id, data)),
		deleteProject: id => dispatch(deleteProject(id))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Project);
