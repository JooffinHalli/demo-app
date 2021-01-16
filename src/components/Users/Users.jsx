import React from 'react';
import c from './Users.module.css';
import User from './User/User';

const Paginator = (props) => {
	let pages = [...props.pagesArr];
	return <div className={c.pagesCountDiv}>
				<span onClick={() => props.onPrevPagesArr()}>prev </span>
				{pages.map(page => <span className={props.currentPage === page ? c.selected : ''} 
									 	 onClick={() => props.onPageChange(page)}
									 	 key={page}>{page}</span>)}
				<span onClick={() => props.onNextPagesArr()}> next</span>
			</div>
}

let Users = React.memo((props) => {
	return (
		<div>
			<Paginator onPrevPagesArr={props.onPrevPagesArr}
					   onNextPagesArr={props.onNextPagesArr}
					   currentPage={props.currentPage}
					   pagesArr={props.pagesArr}
					   onPageChange={props.onPageChange} />

			<div className={c.usersContainer}>
				{props.users.map(user => <User imgSrc={user.photos.small || props.userPhoto}
											   key={user.id}
											   id={user.id}
											   name={user.name}
											   status={user.status}
											   country={'user.location.country'}
											   city={'user.location.city'}
											   followed={user.followed}
											   follow={props.follow}
											   unfollow={props.unfollow}
											   getUsers={props.getUsers}
											   toggleFollowingProgress={props.toggleFollowingProgress}
											   followingInProgress={props.followingInProgress}
											   currentPage={props.currentPage} /> )}
			</div>
		</div>
	)
})

export default Users;