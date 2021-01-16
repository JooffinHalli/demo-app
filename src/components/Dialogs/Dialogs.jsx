import React from 'react';
import c from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {reduxForm, Field} from 'redux-form';
import {Textarea} from '../../common/FormsControlers/FormsControlers';
import {required, maxLengthCreator} from '../../utils/validators/validators';

const Dialogs = (props) => {

	let dialog = props.messagePage.dialogs.map(dialog => <Dialog key={dialog.id}
																 name={dialog.name}
																 id={dialog.id} />);

	let message = props.messagePage.messages.map(message => <Message key={message.id}
																	 message={message.message} />)
	
	let onSendMessageRedux = (value) => {
		props.sendNewMessage(value.newMessageText);
	}

	return (
		<div className={c.dialogs}>
			<div className={c.dialogsItems}>
				{dialog}
			</div>
			<div className={c.messagesItems}>
				{message}
				<div  className={c.input}>
					<AddMessageFormRedux onSubmit={onSendMessageRedux}/>
		      	</div>
			</div>
		</div>
	);
}

const maxLength = maxLengthCreator(50);

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea}
					   validate={[required, maxLength]}
					   name='newMessageText'
					   placeholder='Enter your message' />
		  	</div>
		  	<div>
		    	<button>Send message</button>
		  	</div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({form: 'DialogAddMessageForm'})(AddMessageForm)

export default Dialogs;