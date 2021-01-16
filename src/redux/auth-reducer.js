import {authApi, securityApi} from '../api/api';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS';

let initialState = {
	userId: null,
	login: null,
	email: null,
	isAuth: false,
	captchaUrl: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {...state, ...action.payload};
		case GET_CAPTCHA_URL_SUCCESS:
			return {...state, captchaUrl: action.payload};
		default:
			return state;
	}
}

const setAuthUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});
const getCaptchaUrlSuccess = (captcha) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: captcha});

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityApi.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const authMe = () => async (dispatch) => {
	const response = await authApi.authMe()
	if (response.data.resultCode === 0) {
		let {id, login, email} = response.data.data;
		dispatch(setAuthUserData(id, login, email, true))
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const response = await authApi.login(email, password, rememberMe, captcha)
	if (response.data.resultCode === 0) {
		dispatch(authMe())
	} else {
		if (response.data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}
		let message = response.data.messages.length > 0 ? response.data.messages : 'Some error';
		dispatch(stopSubmit('Login', {_error: message}));
	}
}

export const logout = () => async (dispatch) => {
	const response = await authApi.logout()
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
}

export default authReducer;