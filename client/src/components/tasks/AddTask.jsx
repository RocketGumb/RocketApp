import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// Form for add task
export default function AddTask({
	addTask,
	addButtonShow,
	addButtonHide,
	buttonIsOpen
}) {
	return (
		<div className="content_block_input">
			<form onSubmit={addTask}>
				<input
					type="text"
					name="title"
					autoComplete="off"
					placeholder="Добавить задачу."
					onFocus={addButtonShow}
					onBlur={addButtonHide}
				/>
				<ReactCSSTransitionGroup
					transitionName="fadeIn"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={400}
				>
					{buttonIsOpen && (
						<button className="btn" id="addTask">
							Добавить
						</button>
					)}
				</ReactCSSTransitionGroup>
			</form>
		</div>
	);
}
