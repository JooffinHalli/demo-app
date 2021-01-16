import {userApi, profileApi} from '../api/api';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';
const Save_PROFILE_DATA = 'Save-PROFILE-DATA';

let initialState = {
	profile: null,
	posts: [
		{id: 1, message: 'Hello, how are you?', likeCount: 1},
		{id: 2, message: 'Hello, this is my first post', likeCount: 2},
		{id: 3, message: 'Hello, how are you?', likeCount: 3},
		{id: 4, message: 'Hello, how are you?', likeCount: 4},
		{id: 5, message: 'Hello, how are you?', likeCount: 5},
		{id: 6, message: 'Hello, how are you?', likeCount: 6},
	],
	status: '',
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {id: state.posts.length + 1, message: action.newPost, likeCount: 0};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			};
		case SET_USER_PROFILE:
			return {...state, profile: action.profile};
		case SET_USER_STATUS:
			return {...state, status: action.status};
		case SAVE_PHOTO_SUCCESS:
			return {...state, profile: {...state.profile, photos: action.photos}};
		case Save_PROFILE_DATA:
			return {...state, profile: {...state.profile, ...action.profileData, ...action.profileData.contacts}};
		default:
			return state;
	}
}

export const addNewPost = (newPost) => ({type: ADD_POST, newPost});
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});
const saveProfileData = (profileData) => ({type: Save_PROFILE_DATA, profileData});

export const getUserProfile = (userId) => async (dispatch) => {
	let response = await userApi.getUserProfile(userId)
	dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
	let response = await profileApi.getUserStatus(userId);
	dispatch(setUserStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
	let response = await profileApi.updateUserStatus(status)
	if (response.resultCode === 0) {
		dispatch(setUserStatus(response.data));
	}
}

export const savePhoto = (photo) => async (dispatch) => {
	let response = await profileApi.savePhoto(photo)
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
}

export const getUserProfileData = (profileData) => async (dispatch) => {
	let response = await profileApi.getUserProfileData(profileData)
	if (response.data.resultCode === 0) {
		dispatch(saveProfileData(response.data.data));
		dispatch(getUserProfile(profileData.userId))
	} else {
		let message = response.data.messages.length > 0 ? response.data.messages : 'Some error';
		dispatch(stopSubmit('ProfileData', {'contacts': {'facebook': message} } ) );
		return Promise.reject(response.data.messages);
	}
}

export default profileReducer;