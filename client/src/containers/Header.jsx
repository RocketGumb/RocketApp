import React, { Component } from "react";
import { connect } from "react-redux";
import userIcon from "../images/user.png";
import HeaderSettings from "../components/HeaderSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { sidebarToggle } from "../actions/helperAction";
import logo from "../images/logo.svg";

class Header extends Component {
	state = {
		isOpen: false
	};

	settingsShow = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	sidebarToggle = () => {
		this.props.sidebarToggle(!this.props.sidebarState);
	};

	render() {
		const { user } = this.props.auth;
		return (
			<header className="header">
				<div className="header_container">
					<div className="header_logo">
						<h1 className="white header_title h3">
							<img height="40" src={logo} alt="Логотип" />
							Rocket
							<strong>List</strong>
						</h1>
						<p
							id="sidebarToggle"
							className={this.props.sidebarState ? "normal" : "compact"}
							onClick={this.sidebarToggle}
						>
							<span />
							<span />
							<span />
						</p>
					</div>
					<div className="header_user">
						<img src={userIcon} alt="" />
						{user ? <p>{user.name}</p> : ""}
						<p
							onClick={this.settingsShow.bind(this)}
							className="header_user__setting"
						>
							<FontAwesomeIcon icon={faCog} />
						</p>

						<ReactCSSTransitionGroup
							transitionName="fadeIn"
							transitionEnterTimeout={400}
							transitionLeaveTimeout={400}
						>
							{this.state.isOpen && <HeaderSettings />}
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</header>
		);
	}
}
const mapStateToProps = state => {
	return {
		auth: state.auth,
		sidebarState: state.helper.sidebarState
	};
};

const mapDispatchToProps = dispatch => {
	return {
		sidebarToggle: sidebarState => {
			dispatch(sidebarToggle(sidebarState));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
