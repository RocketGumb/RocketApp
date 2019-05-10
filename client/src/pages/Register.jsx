import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorAction";
import FieldForm from "../components/FieldForm";

class Register extends Component {
	state = {
		name: "",
		nameError: "",
		email: "",
		emailError: "",
		password: "",
		passwordError: "",
		agreeError: ""
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		// Check for email
		if (error !== prevProps.error) {
			if (error.id === "REGISTER_FAIL" && error.emailExists) {
				this.setState({ emailError: "Пользователь уже существет" });
			}
		}
		// Reset fields, if authenticated
		if (isAuthenticated !== prevProps.isAuthenticated) {
			this.setState({
				name: "",
				email: "",
				password: ""
			});
		}
	}

	// Wrapper for error message
	errorMessage = message => {
		if (message) {
			return <p className="error-message">{message}</p>;
		}
		return;
	};

	// Update state on change fields
	fieldChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	// Validate fields in form
	checkForError = () => {
		let isError = false;
		const errors = {};
		const { name, email, password } = this.state;
		// For check email
		const reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

		// Check name
		if (!name) {
			errors.nameError = "Введите Ваше имя";
			isError = true;
		} else if (name.length < 2) {
			errors.nameError = "Имя должно содержать минимум 2 символа";
			isError = true;
		}

		// Check email
		if (!email) {
			errors.emailError = "Введите Ваш email";
			isError = true;
		} else if (!reg.test(email)) {
			errors.emailError = "Некорректный email";
			isError = true;
		}

		// Check password
		if (password.length < 6) {
			errors.passwordError = "Пароль должен содержать минимум 6 символов";
			isError = true;
		}

		// If error, show
		if (isError) {
			this.setState({
				...errors
			});
		}

		return isError;
	};

	registerUser = event => {
		event.preventDefault();

		// Reset error message
		this.setState({
			nameError: "",
			emailError: "",
			passwordError: "",
			agreeError: ""
		});
		this.props.clearErrors();

		let error = this.checkForError();

		const agree = event.target.agree.checked;
		if (!agree) {
			this.setState({
				agreeError:
					"Пожалуйста, подтвердите свое согласие с «Условиями использования» и с «Политикой конфиденциальности»."
			});
			error = true;
		}

		if (!error) {
			const { name, password } = this.state;
			const email = this.state.email.toLowerCase();
			this.props.register({ name, email, password });
		}
	};

	render() {
		const { name, email, password } = this.state;
		// Create error message
		const nameError = this.errorMessage(this.state.nameError),
			emailError = this.errorMessage(this.state.emailError),
			passwordError = this.errorMessage(this.state.passwordError),
			agreeError = this.errorMessage(this.state.agreeError);

		return (
			<section className="auth">
				<div className="auth_block">
					<div className="auth_block__title">
						<Link className="link-to-back" to="/">
							На главную
						</Link>
						<h2 className="h2">Регистрация</h2>
						<p className="text">
							Организуйте свои задачи и наслаждайтесь жизнью
						</p>
					</div>
					<div className="auth_block__form">
						<form noValidate onSubmit={this.registerUser}>
							<FieldForm
								type="text"
								id="name"
								labelText="Ваше имя"
								value={name}
								errorMessage={nameError}
								onChange={this.fieldChange}
							/>
							<FieldForm
								type="text"
								id="email"
								labelText="Ваш email"
								value={email}
								errorMessage={emailError}
								onChange={this.fieldChange}
							/>
							<FieldForm
								type="password"
								id="password"
								labelText="Пароль"
								value={password}
								errorMessage={passwordError}
								onChange={this.fieldChange}
							/>
							<label className="label-row">
								<input
									type="checkbox"
									className="checkbox-template"
									name="agree"
									defaultChecked
								/>
								<p>
									Соглашаюсь с Условиями использования и Политикой
									конфиденциальности.
								</p>
							</label>
							{agreeError}
							<button type="submit" className="btn">
								Создать аккаунт
							</button>
						</form>
						<p className="auth_back">
							Уже есть аккаунт?
							<Link to="/signin">Войти</Link>
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
		register: ({ name, email, password }) => {
			dispatch(register({ name, email, password }));
		},
		clearErrors: () => {
			dispatch(clearErrors());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
