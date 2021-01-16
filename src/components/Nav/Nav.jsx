import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import c from './Nav.module.css';
import NavLinks from './NavLinks/NavLinks';
import Friends from './Friends/Friends';
import {getFriendsApi} from '../../redux/users-reducer';
import {getFriends} from '../../redux/nav-selectors';

const FriendsClassContainer = React.memo((props) => {
	useEffect(() => {
		props.getFriendsApi()	
	}, [])
	return <Friends friends={props.friends} />
})

let mapStateToProps = (state) => {
	return {
		friends: getFriends(state),
		id: state.auth.userId,
	}
}

let FriendsContainer = connect(mapStateToProps, {getFriendsApi})(FriendsClassContainer);
let NavLinksContainer = connect(mapStateToProps)(NavLinks)

const Nav = (props) => {
	return (
		<nav className={c.nav}>
			<NavLinksContainer />
			<FriendsContainer />
		</nav>
	);
}

export default Nav;