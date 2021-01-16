import React, {useEffect} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserProfile, getUserStatus, updateUserStatus, savePhoto, getUserProfileData} from '../../redux/profile-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

const ProfileContainer = React.memo((props) => {

	let userId =  (props.match.params.userId || props.userId)

	useEffect(() => {
		props.getUserProfile(userId);
		props.getUserStatus(userId);
	}, [props.status])

	return (
		<Profile profile={props.profile}
				 userId={userId}
				 status={props.status}
				 isOwner={!props.match.params.userId}
				 savePhoto={props.savePhoto}
				 getUserProfileData={props.getUserProfileData}
				 updateUserStatus={props.updateUserStatus} />
	)
})

let mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		userId: state.auth.userId
	}
}

export default compose(
	connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, getUserProfileData}),
	withAuthRedirect,
	withRouter
	)(ProfileContainer);