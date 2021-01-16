import React from 'react';
import {connect} from 'react-redux';
import MyPosts from './MyPosts';
import {addNewPost} from '../../../redux/profile-reducer';

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
	}
}

let MyPostsContainer = connect(mapStateToProps, {addNewPost})(MyPosts);

export default MyPostsContainer;