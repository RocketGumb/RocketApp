import React from "react";

function TaskCompleteItem({ payload, activateTask, index }) {
	const { id, title } = payload;
	return (
		<li key={id} className="tasks-list_item tasks-list_item_complete">
			<input
				type="checkbox"
				onChange={activateTask}
				defaultChecked
				className="checkbox-template"
				value={id}
			/>
			{title}
		</li>
	);
}

export default TaskCompleteItem;
