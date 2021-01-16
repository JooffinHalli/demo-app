import React from 'react';
import c from './Header.module.css';
import {NavLink} from 'react-router-dom';

const Header = (props) => {
	return (
		<header className={c.header}>
       		<img className={c.logo} src='https://img.app.gugeapps.net/Tmz-FtBSBQJxOnDjGjYdB4HyxthntucEgNnRyCZlPpPEQO5dyfoJPdroRelLUb0m8kucg8_thQ=w128-h128-e365' alt="logo" />
			<div className={c.loginBlock}>
				{
				props.isAuth
				? <div className={c.loginName}>
				  	<NavLink to={'/Profile'}>{props.login}</NavLink>
				  	<div><button onClick={props.logout}>Logout</button></div>
				  </div>
				: <NavLink to={'/Login'}>Login</NavLink>
				}
			</div>
    	</header>
	);
}

export default Header;