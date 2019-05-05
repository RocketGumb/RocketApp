import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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

	editorShow = () => {
		this.setState({
			isOpen: {
				editor: true
			}
		});
	};

	membersShow = () => {
		this.setState({
			isOpen: {
				members: true
			}
		});
	};

	modalClose = () => {
		this.setState({
			isOpen: {
				editor: false,
				members: false
			}
		});
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
						<form>
							<label>
								Название
								<input type="text" defaultValue={project.title} />
							</label>
							<label>
								Описание
								<textarea defaultValue={project.desc} />
							</label>
							<button
								type="button"
								onClick={this.modalClose}
								className="overlay_btn overlay_btn__close"
							>
								Отменить
							</button>
							<button
								type="button"
								onClick={this.modalClose}
								className="overlay_btn overlay_btn__delete"
							>
								Удалить
							</button>
							<button className="overlay_btn overlay_btn__save">
								Сохранить
							</button>
						</form>
					</Modal>
				)}
				{this.state.isOpen.members && (
					<Modal title="Добавить участников" modalClose={this.modalClose}>
						<p className="overlay__wrapper_subtitle">Список участников</p>
						<ul className="overlay__wrapper_list">
							<li>
								g0lubef@yandex.ru
								<div className="overlay__wrapper_list_status">Владелец</div>
							</li>
							<li>
								dimagolubev35@gmail.com
								<button type="button" className="overlay__wrapper_list_delete">
									Удалить
								</button>
							</li>
						</ul>
					</Modal>
				)}
			</Fragment>
		);
	}
}

export default Project;
