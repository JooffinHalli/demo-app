const getUsersSelector = (state) => {
	return state.usersPage.users
}
export const getUsers = (state) => {
	return getUsersSelector(state)
}
export const getPageSize = (state) => {
	return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
	return state.usersPage.currentPage
}
export const getPagesArr = (state) => {
	return state.usersPage.pagesArr
}
export const getIsFetching = (state) => {
	return state.usersPage.isFetching
}
export const getFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress
}