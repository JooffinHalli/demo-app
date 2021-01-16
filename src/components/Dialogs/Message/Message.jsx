import React from 'react';
import {NavLink} from 'react-router-dom';
import c from './Message.module.css';
import userPhoto from '../../../assets/user.png';

const Message = (props) => {
	return (
		<div className={c.message}>
			<div className={c.avaArea}>
				<img className={c.ava} src={userPhoto} alt='Travel-Experience-An-Adventure' />
			</div>
			<div  className={c.messageTextArea}>
				{props.message}
			</div>
		</div>
	);
}

export default Message;