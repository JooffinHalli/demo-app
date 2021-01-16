import React from 'react';
import {NavLink} from 'react-router-dom';
import c from './NavLinks.module.css';

const NavLinks = (props) => {
    return (
        <div>
            <div className={c.item}>
                <NavLink to='/Profile' activeClassName={c.active}>Profile</NavLink>
            </div>
            <div className={c.item}>
                <NavLink to='/Dialogs' activeClassName={c.active}>Messages</NavLink>
            </div>
            <div className={c.item}>
                <NavLink to='/News' activeClassName={c.active}>News</NavLink>
            </div>
            <div className={c.item}>
                <NavLink to='/Music' activeClassName={c.active}>Music</NavLink>
            </div>
            <div className={c.item}>
                <NavLink to='/Settings' activeClassName={c.active}>Settings</NavLink>
            </div>
            <div className={c.item}>
                <NavLink to='/Users' activeClassName={c.active}>Users</NavLink>
            </div>
        </div>
    );
}

export default NavLinks;