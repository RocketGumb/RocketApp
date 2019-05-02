import React, { Fragment, Component } from "react";
import { getProjects, getTasksForPoject } from "../actions/projectActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components for work with projects
import ProjectList from "../containers/ProjectList";
// Components for work with tasks
import TasksList from "../containers/TasksList";
import TaskCompleteList from "../containers/TaskCompleteList";

// Page with tasks
class Projects extends Component {
	// state = {
	// 	descValue: ""
	// };

	// descChange = event => {
	// 	const desc = event.target;
	// 	this.setState({
	// 		descValue: desc
	// 	});
	// 	console.log(desc);
	// };

	// Output tasks
	componentDidMount() {
		const user = this.props.user;
		if (user) {
			this.props.getProjects(user._id);
			this.props.getTasksForPoject(user._id);
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
					<Fragment>
						<div className="pagetitle">
							{project.title}
							<div className="subtitle">{project.desc}</div>
						</div>
						<div className="breadcrumbs">
							<Link to="/all/projects" className="link">
								Проекты
							</Link>{" "}
							/ {project.title}
						</div>
						<section className="content_main">
							<TasksList user={user} project={projectID} tasks={tasks} />
							<TaskCompleteList tasks={tasks} />
						</section>
					</Fragment>
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
		getProjects: id => dispatch(getProjects(id)),
		getTasksForPoject: id => dispatch(getTasksForPoject(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Projects);
