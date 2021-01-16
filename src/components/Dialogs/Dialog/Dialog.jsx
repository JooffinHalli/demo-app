import React from 'react';
import {NavLink} from 'react-router-dom';
import c from './Dialog.module.css';

const Dialog = (props) => {
	let path = '/Dialogs/' + props.id;
	return (
		<div className={c.dialog}>
			<NavLink to={path} activeClassName={c.active}>
				{props.name}
			</NavLink>
		</div>
	);
}

export default Dialog;