import React, { Component } from "react";
import { connect } from "react-redux";
import userIcon from "../../images/user.png";
import { Link } from "react-router-dom";
import HeaderSettings from "../../components/HeaderSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Header extends Component {
	state = {
		isOpen: false
	};

	settingsShow = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		const { user } = this.props.auth;
		return (
			<header className="header">
				<div className="header_container">
					<h1 className="white header_title">
						<Link className="h3" to="/">
							Rocket
							<strong>List</strong>
						</Link>
					</h1>
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
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	null
)(Header);
