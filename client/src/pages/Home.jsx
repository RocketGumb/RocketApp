import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

class Home extends Component {
	render() {
		return (
			<div className="home">
				<header className="home_header">
					<div className="home_header__title">
						<img height="40" src={logo} alt="Логотип" />
						<p>
							Rocket<strong>List</strong>
						</p>
					</div>
					<div className="home_header__auth">
						<Link className="home_header__auth__register" to="/signup">
							Регистрация
						</Link>
						<Link className="home_header__auth__login" to="/signin">
							Вход
						</Link>
					</div>
				</header>
				<div className="home_offer">
					<h1>Организуй свою жизнь</h1>
					<p>
						Rocket<strong>List</strong> поможет эффективно организовать каждый
						день
						<br /> и держать жизнь под контролем
					</p>
					<Link className="home_offer__button" to="/signup">
						Создать аккаунт
					</Link>
				</div>
			</div>
		);
	}
}

export default Home;
