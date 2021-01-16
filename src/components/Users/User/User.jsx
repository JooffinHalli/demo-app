import React from 'react';
import c from './User.module.css';
import {NavLink} from 'react-router-dom';

const User = (props) => {

	return (
		<div className={c.userContainer}>
			<div className={c.avaDiv}>
				<NavLink to={'/Profile/' + props.id}><img src={props.imgSrc} className={c.ava} alt='' /></NavLink>
				<div className={c.name}>{props.name}</div>
				<div className={c.btn}>
				{
					props.followed 
					? <button disabled={props.followingInProgress.some(id => id === props.id)} 
							  onClick={() => props.unfollow(props.id, props.currentPage)}>Unfollow</button> 
					: <button disabled={props.followingInProgress.some(id => id === props.id)}
							  onClick={() => props.follow(props.id, props.currentPage)}>follow</button> 
				}
				</div>
			</div>
			<div className={c.info}>
				<div className={c.status}>{props.status}</div>
			</div>
		</div>
	)
}

export default User;