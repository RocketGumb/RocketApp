import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { getTasks, addTask, deleteTask } from "../actions/taskActions";
import TaskItem from "../components/TaskItem";
// Form for add task
import AddTask from "../components/AddTask";

// Output and work with tasks
class TasksList extends Component {
  state = {
    buttonIsActive: false
  };

  // Show and hide the button for add a task
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
    this.props.deleteTask(id);
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
            {tasks.map(({ id, title, priority }) => (
              <TaskItem
                key={id}
                payload={{ id, title, priority }}
                deleteTask={this.deleteTask.bind(this)}
              />
            ))}
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
    addTask: (id, title) => dispatch(addTask(id, title)),
    deleteTask: id => dispatch(deleteTask(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
<<<<<<< HEAD
)(TasksList);
=======
)(TasksList);
>>>>>>> 9ce8d6119ecc1d1039b70c92ce4a305b225c0818
