import React from 'react';
import c from './Friend.module.css';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../../../assets/user.png';

const Friend = (props) => {
	return (
		<div className={c.friend}>
			<NavLink to={'/Profile/' + props.id}>
				<img className={c.ava} src={props.ava || userPhoto} alt='avatar' />
			</NavLink>
		</div>
	);
}

export default Friend;