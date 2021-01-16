import React from 'react';
import {reduxForm} from 'redux-form';
import {createField} from '../../utils/CreateField';
import {login} from '../../redux/auth-reducer';
import {Input} from '../../common/FormsControlers/FormsControlers';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import c from './Login.module.css';
import {required} from '../../utils/validators/validators';


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
	console.log(captchaUrl)
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{createField('', [required], 'Login', 'login', Input)}
				{createField('', [required], 'Password', 'password', Input)}			
				{createField('checkbox', [], '', 'rememberMe', Input)}
				{captchaUrl && <img src={captchaUrl} alt='captcha' />}
				{captchaUrl && createField('', [required], '', 'captcha', Input)}
				{error && <div className={c.error}>{error}</div>}
				<div><button>Login</button></div>
			</form>
		</div>
	);
}

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm);

const Login = ({login, isAuth, captchaUrl}) => {
	const onSubmitt = (formData) => {
		login(formData.login, formData.password, formData.rememberMe, formData.captcha);
	}
	return (
		isAuth
		? <Redirect to={'/Profile'} />
		: <div>
		  	<h1>Login</h1>
		  	<LoginReduxForm onSubmit={onSubmitt} captchaUrl={captchaUrl}/>
	  	</div>
	)
}


const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);