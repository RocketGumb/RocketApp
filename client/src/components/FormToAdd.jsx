import React from "react";

// Form for add
export default function FormToAdd({ add, placeholder }) {
	return (
		<div className="content_block_input">
			<form onSubmit={add}>
				<input
					type="text"
					name="title"
					autoComplete="off"
					placeholder={placeholder}
				/>
				<span>
					<button className="btn" id="addTask">
						Добавить
					</button>
				</span>
			</form>
		</div>
	);
}
