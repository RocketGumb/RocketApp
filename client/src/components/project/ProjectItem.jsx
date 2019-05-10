import React from "react";
import { Link } from "react-router-dom";

// Wrapper for menu items on component Sidebar
function ProjectItem({ payload, tasks }) {
	const { id, title, desc } = payload;
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(task => task.completed).length;
	return (
		<Link
			className="project content_block content_block__medium"
			to={`/all/projects/${id}`}
		>
			<div className="project_name">
				<h2 className="project_name_title">{title}</h2>
				<h4 className="project_name_subtitle">{desc}</h4>
			</div>
			<div className="project_count">
				<p className="project_count_task">
					{completedTasks} из {totalTasks}
				</p>
				<div
					className="project_count_progress"
					style={{ width: (100 / totalTasks) * completedTasks + "%" }}
				/>
				<div className="project_count_bar" />
			</div>
		</Link>
	);
}

export default ProjectItem;
