import React from "react";
import ReactDOM from "react-dom";

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.root = document.createElement("div");
	}
	componentDidMount() {
		document.body.appendChild(this.root);
		document.body.style.overflow = "hidden";
	}

	componentWillUnmount() {
		document.body.removeChild(this.root);
		document.body.style.overflow = "auto";
	}

	render() {
		return ReactDOM.createPortal(
			<div className="overlay">
				<div className="overlay__background" onClick={this.props.modalClose} />
				<div className="overlay__wrapper">
					<h2 className="overlay__wrapper__title">{this.props.title}</h2>
					{this.props.children}
				</div>
			</div>,
			this.root
		);
	}
}
