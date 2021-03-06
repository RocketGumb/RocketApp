import React, { Fragment, Component } from "react";
import { getProjects, clearTasksForProjects } from "../actions/projectActions";
import { connect } from "react-redux";

// Components for work with projects
import ProjectList from "../containers/ProjectList";
import Project from "../containers/Project";

// Page with tasks
class Projects extends Component {
	// Output tasks
	componentDidMount() {
		const { user } = this.props;
		if (user) {
			this.props.clearTasksForProjects();
			this.props.getProjects(user.email);
		}
	}

	render() {
		const { projects, projectTasks, user } = this.props;
		// Get project id
		const projectID = this.props.match.params.id;
		let project = "",
			tasks = [];
		// Get data for project
		if (projects.length && projectID)
			project = projects.find(project => project.id === projectID);
		// Get tasks for projects
		if (projectTasks.length && projectID)
			tasks = projectTasks.filter(task => task.project === projectID);

		return (
			<Fragment>
				{!project ? (
					// Page for projects list
					<Fragment>
						<div className="pagetitle">Проекты</div>
						<section className="content_main">
							<ProjectList
								user={user}
								projects={projects}
								projectTasks={projectTasks}
							/>
						</section>
					</Fragment>
				) : (
					// Page for project
					<Project
						project={project}
						user={user}
						tasks={tasks}
						projectID={projectID}
					/>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		projects: state.project.projects,
		projectTasks: state.project.projectTasks,
		user: state.auth.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getProjects: email => dispatch(getProjects(email)),
		clearTasksForProjects: () => dispatch(clearTasksForProjects())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Projects);
