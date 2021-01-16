import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Preloader from '../../common/Preloader'
import Users from './Users';
import userPhoto from '../../assets/user.png';
import {
	follow,
	unfollow,
	setCurrentPage,
	nextPagesArr,
	prevPagesArr,
	getUsersApi} from '../../redux/users-reducer';
import {
	getUsers,
	getPageSize,
	getTotalUsersCount,
	getCurrentPage,
	getPagesArr,
	getIsFetching,
	getFollowingInProgress} from '../../redux/users-selectors';

const UsersContainer = React.memo((props) => {

	useEffect(() => {
		props.getUsersApi(props.currentPage, props.pageSize);
	}, [props.currentPage])

	const onPageChange = async (pageNumber) => {
		await props.setCurrentPage(pageNumber);
	}

	return (
		<div>
			{props.isFetching ? <Preloader /> : null}
			<Users onPrevPagesArr={props.prevPagesArr}
			  	   onNextPagesArr={props.nextPagesArr}
			 	   onPageChange={onPageChange}
				   follow={props.follow}
				   unfollow={props.unfollow}
				   users={props.users}
				   pagesArr={props.pagesArr}
				   currentPage={props.currentPage}
				   userPhoto={userPhoto}
				   getUsers={props.getUsersApi}
				   toggleFollowingProgress={props.toggleFollowingProgress}
				   followingInProgress={props.followingInProgress}
			/>
		</div>
	)
	
})

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		pagesArr: getPagesArr(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

export default connect(mapStateToProps, {follow,
									  	 unfollow,
										 setCurrentPage,
										 nextPagesArr,
										 prevPagesArr,
										 getUsersApi})(UsersContainer);