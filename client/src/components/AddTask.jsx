import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// Form for add task
export default function AddTask(props) {
	return (
		<div className="content_block_input">
			<form onSubmit={props.addTask}>
				<input
					type="text"
					name="title"
					autoComplete="off"
					placeholder="Добавить задачу."
					onFocus={props.addButtonShow}
					onBlur={props.addButtonHide}
				/>
				<ReactCSSTransitionGroup
					transitionName="fadeIn"
					transitionEnterTimeout={400}
					transitionLeaveTimeout={400}
				>
					{props.buttonIsOpen && (
						<button className="btn" id="addTask">
							Добавить
						</button>
					)}
				</ReactCSSTransitionGroup>
			</form>
		</div>
	);
}
