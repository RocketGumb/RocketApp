import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorAction";
import FieldForm from "../components/FieldForm";

class Login extends Component {
	state = {
		name: "",
		nameError: "",
		email: "",
		emailError: "",
		password: "",
		passwordError: "",
		agreeError: ""
	};

	componentDidUpdate = prevProps => {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			if (error.id === "LOGIN_FAIL") {
				this.setState({ emailError: "Неверные данные" });
			}
		}
		if (isAuthenticated !== prevProps.isAuthenticated) {
			this.setState({
				name: "",
				email: "",
				password: ""
			});
		}
	};

	errorMessage = message => {
		if (message) {
			return <p className="error-message">{message}</p>;
		}
		return;
	};

	fieldChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	checkForError = () => {
		let isError = false;
		const errors = {};
		const { email, password } = this.state;

		if (!email) {
			errors.emailError = "Введите Ваш email";
			isError = true;
		}

		if (!password) {
			errors.passwordError = "Введите Ваш пароль";
			isError = true;
		}

		if (isError) {
			this.setState({
				...errors
			});
		}

		return isError;
	};

	loginUser = event => {
		event.preventDefault();

		// Reset error message
		this.setState({
			emailError: "",
			passwordError: ""
		});
		this.props.clearErrors();

		let error = this.checkForError();

		if (!error) {
			const { email, password } = this.state;
			this.props.login({ email, password });
		}
	};

	render() {
		const emailError = this.errorMessage(this.state.emailError),
			passwordError = this.errorMessage(this.state.passwordError);

		const { email, password } = this.state;

		return (
			<section className="auth">
				{this.props.isAuthenticated ? <Redirect to="/all" /> : ""}
				<div className="auth_block">
					<div className="auth_block__title">
						<Link className="link-to-back" to="/">
							На главную
						</Link>
						<h2 className="h2">Вход</h2>
						<p className="text">
							Организуйте свои задачи и наслаждайтесь жизнью
						</p>
					</div>
					<div className="auth_block__form">
						<form noValidate onSubmit={this.loginUser.bind(this)}>
							<FieldForm
								type="text"
								id="email"
								labelText="Ваш email"
								value={email}
								errorMessage={emailError}
								onChange={this.fieldChange.bind(this)}
							/>
							<FieldForm
								type="password"
								id="password"
								labelText="Пароль"
								value={password}
								errorMessage={passwordError}
								onChange={this.fieldChange.bind(this)}
							/>
							<button type="submit" className="btn">
								Войти
							</button>
						</form>
						<p className="auth_back">
							Нет аккаунта?
							<Link to="/signup">Создайте за пару секунд</Link>
						</p>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.error,
		isAuthenticated: state.auth.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: ({ email, password }) => {
			dispatch(login({ email, password }));
		},
		clearErrors: () => {
			dispatch(clearErrors());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
