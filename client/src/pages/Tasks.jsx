import React, { Fragment, Component } from "react";
import { getTasks } from "../actions/taskActions";
import { connect } from "react-redux";

// Components for page with tasks
import TasksList from "../containers/TasksList";
import TaskCompleteList from "../containers/TaskCompleteList";

// Page with tasks
class Tasks extends Component {
	// Output tasks
	componentDidMount() {
		const user = this.props.user;
		if (user) {
			this.props.getTasks(user.email);
		}
	}

	render() {
		const { tasks, user } = this.props;
		return (
			<Fragment>
				<div className="pagetitle">Входящие задачи</div>
				<section className="content_main">
					<TasksList
						user={user}
						tasks={tasks.filter(task => !task.completed)}
						executorOn={false}
					/>
					<TaskCompleteList tasks={tasks.filter(task => task.completed)} />
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		tasks: state.task.tasks
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: email => dispatch(getTasks(email))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tasks);
