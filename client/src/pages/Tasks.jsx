import React, { Fragment } from "react";
import TasksList from "../containers/TasksList";

// Page with tasks
export default function Tasks() {
	return (
		<Fragment>
			<div className="pagetitle">Задачи</div>
			<section className="content_main">
				<TasksList />
			</section>
		</Fragment>
	);
}
