import React from 'react';
import c from './Friends.module.css';
import Friend from './Friend/Friend';

const Friends = (props) => {
	let friends = props.friends.map(friend => <Friend key={friend.id}
													  id={friend.id}
													  ava={friend.photos.small}
	 												  name={friend.name} /> );
	return (
		<div className={c.friendsArea}>
			{friends}
		</div>
	);
}

export default Friends;