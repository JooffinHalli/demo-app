import React from 'react';
import c from './Post.module.css';
import UserPhoto from '../../../../assets/user.png';

const Post = ({message, likeCount}) => {
	return (
		<div className={c.item}>
			<img src={UserPhoto} alt='avatar' />
			<div>{message}</div>
			<div>{likeCount} likes</div>
		</div>
	);
}

export default Post;