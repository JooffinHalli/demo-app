import {userApi} from '../api/api';
import {updateObjArr} from '../utils/object-helper';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_FRIENDS = 'SET-FRIENDS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const NEXT_PAGES_ARR = 'NEXT_PAGES_ARR';
const PREV_PAGES_ARR = 'PREV_PAGES_ARR';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

let initialState = {
	users: [],
	friends: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	pagesArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	isFetching: false,
	followingInProgress: [],
};


const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjArr(state.users, action.userId, 'id', {followed: true})
			};
		case UNFOLLOW:
			return {
				...state,
				users: updateObjArr(state.users, action.userId, 'id', {followed: false})
			};
		case SET_USERS:
			return {...state, users: [...action.users]};
		case SET_FRIENDS:
			return {...state, friends: [...action.friends]};
		case SET_CURRENT_PAGE:
			return {...state, currentPage: action.currentPage};
		case SET_TOTAL_USERS_COUNT:
			return {...state, totalUsersCount: action.totalUsersCount};
		case NEXT_PAGES_ARR:
			return {...state, pagesArr: state.pagesArr.map((p) => p + 10)};
		case PREV_PAGES_ARR:
			return {...state, pagesArr: state.pagesArr.map((p) => p - 10)};
		case TOGGLE_IS_FETCHING:
			return {...state, isFetching: action.isFetching};
		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
				? [...state.followingInProgress, action.userId]
				: state.followingInProgress.filter(id => id !== action.userId)
			};
		default:
			return state;
	}
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setFriends = (friends) => ({type: SET_FRIENDS, friends});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const nextPagesArr = () => ({type: NEXT_PAGES_ARR});
export const prevPagesArr = () => ({type: PREV_PAGES_ARR});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId});

export const getUsersApi = (currentPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	dispatch(setCurrentPage(currentPage));
	let data = await userApi.getUsers(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollow = async (userId, page, dispatch, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId)
 	if (response === 0) {
 		dispatch(actionCreator(userId));
 	}
 	dispatch(toggleFollowingProgress(false, userId));
	dispatch(getUsersApi(page, 10));
}

export const follow = (userId, page) => async (dispatch) => {
	followUnfollow(userId, page, dispatch, userApi.follow.bind(userApi), followSuccess)
}

export const unfollow = (userId, page) => async (dispatch) => {
	followUnfollow(userId, page, dispatch, userApi.unfollow.bind(userApi), unfollowSuccess)	
}

export const getFriendsApi = () => async (dispatch) => {
	let data = await userApi.getFriends()
 	dispatch(setFriends(data.items));
}

export default usersReducer;