import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../images/space.mp4";

class Home extends Component {
	render() {
		return (
			<Fragment>
				<div className="home-bg">
					<video muted loop autoPlay className="fhome-bg_video">
						<source src={bgVideo} type="video/mp4" />
					</video>
					<div className="home-bg_overlay" />
				</div>
				<header className="home_header">
					<div className="home_header__title">
						Rocket<strong>List</strong>
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
					<h1>Организуйте свою жизнь</h1>
					<p>
						Rocket<strong>List</strong> поможет эффективно организовать каждый
						день
						<br /> и держать жизнь под контролем
					</p>
					<Link className="home_offer__button" to="/signup">
						Создать аккаунт
					</Link>
				</div>
			</Fragment>
		);
	}
}

export default Home;
