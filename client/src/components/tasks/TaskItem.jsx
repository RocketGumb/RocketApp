import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";

// Wrapper for menu items on component Sidebar
function TaskItem({
	payload,
	completeTask,
	priorityChange,
	priorityIsOpen,
	togglePriorityWindow
}) {
	const { id, title, priority } = payload;
	const classPriotity = `priority${priority}`;
	const priorityValue = [1, 2, 3];
	return (
		<li className="tasks-list_item">
			<input
				type="checkbox"
				onChange={completeTask}
				className="checkbox-template"
				value={id}
			/>
			<Link to={`/all/tasks/${id}`}>
				<p className="tasks-list_item__title">{title}</p>
			</Link>
			<p
				className="tasks-list_item__priority"
				onClick={togglePriorityWindow.bind(this, id)}
			>
				<FontAwesomeIcon className={classPriotity} icon={faFlag} />

				<ReactCSSTransitionGroup
					className="priority-change"
					transitionName="fadeIn"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={100}
				>
					{priorityIsOpen === id &&
						priorityValue.map(value => (
							<label key={value}>
								<input
									onChange={priorityChange}
									type="radio"
									name={id}
									value={value}
									defaultChecked={value === priority ? "checked" : ""}
								/>
							</label>
						))}
				</ReactCSSTransitionGroup>
			</p>
		</li>
	);
}

export default TaskItem;
