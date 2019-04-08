import React from "react";

// Wrapper for menu items on component Sidebar
function FieldForm({ type, id, labelText, errorMessage, onChange, value }) {
	return (
		<div className="auth_block__form_item">
			<input
				onChange={onChange}
				autoComplete="off"
				type={type}
				id={id}
				value={value}
				required
			/>
			<label htmlFor={id}>{labelText}</label>
			{errorMessage}
		</div>
	);
}

export default FieldForm;
