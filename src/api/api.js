import * as axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	headers: {
		'API-KEY': '6ed165e1-70bb-4dab-8c47-51a442986a35'
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const userApi = {

	getUsers(currentPage, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
					   .then(response => response.data)
	},

	authMe() {
		return authApi.authMe()
	},

	follow(id) {
		return instance.post(`follow/${id}`)
					   .then(response => response.resultCode)
	},

	unfollow(id) {
		return instance.delete(`follow/${id}`)
					   .then(response => response.resultCode)
	},

	getUserProfile(userId) {
		return profileApi.getUserProfile(userId);
	},

	getFriends() {
		return instance.get('users?friend=true').then(response => response.data)
	}
}

export const profileApi = {

	getUserProfile(userId) {
		return instance.get('profile/' + userId)
	},

	getUserProfileData(profileData) {
		return instance.put('profile', profileData)
	},

	getUserStatus(userId) {
		return instance.get('profile/status/' + userId)
	},

	updateUserStatus(status) {
		return instance.put('profile/status', {status: status})
	},

	savePhoto(photo) {
		const formdata = new FormData();
		formdata.append('image', photo)
		return instance.put('/profile/photo', formdata, {
			headers: {
				'Content-Type': 'multipart/formdata'
			}
		})
	}

}

export const authApi = {

	authMe() {
		return instance.get('auth/me')
	},

	login(email, password, rememberMe, captcha) {
		return instance.post('auth/login', {email, password, rememberMe, captcha})
	},

	logout() {
		return instance.delete('auth/login')
	},
}

export const securityApi = {
	getCaptchaUrl() {
		return instance.get('security/get-captcha-url');
	}
}