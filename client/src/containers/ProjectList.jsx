import React, { Component, Fragment } from "react";
import FormToAdd from "../components/FormToAdd";
import ProjectItem from "../components/project/ProjectItem";
import { connect } from "react-redux";
import { addProject } from "../actions/projectActions";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class ProjectList extends Component {
	// Add project
	addProject = event => {
		event.preventDefault();

		const id = this.props.user._id,
			title = event.target.title.value;

		if (title) {
			this.props.addProject(id, title);
			event.target.title.value = "";
		}
	};

	render() {
		const projects = this.props.projects;
		let projectTasks = this.props.projectTasks;
		return (
			<Fragment>
				<ReactCSSTransitionGroup
					transitionName="fadeIn"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={200}
					className="projectWrapper"
				>
					{projects.map(({ id, title, desc }) => {
						return (
							<ProjectItem
								key={id}
								payload={{ id, title, desc }}
								tasks={projectTasks.filter(task => task.project === id)}
							/>
						);
					})}
				</ReactCSSTransitionGroup>
				<div className="content_block content_block__big">
					<FormToAdd add={this.addProject} placeholder="Добавить проект" />
				</div>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addProject: (id, title) => dispatch(addProject(id, title))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ProjectList);
