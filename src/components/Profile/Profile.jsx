import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = React.memo(props => {
	return (
		<div>
			<ProfileInfo profile={props.profile}
						 status={props.status}
						 userId={props.userId}
						 isOwner={props.isOwner}
						 savePhoto={props.savePhoto}
						 getUserProfileData={props.getUserProfileData}
						 updateUserStatus={props.updateUserStatus} />
	        <MyPostsContainer />
     	</div>
	);
})

export default Profile;
