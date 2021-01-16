import React from 'react';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import Dialogs from './Dialogs';
import {sendNewMessage} from '../../redux/messages-reducer';

let mapStateToProps = (state) => {
	return {
		messagePage: state.messagePage
	}
}

export default compose(
	connect(mapStateToProps, {sendNewMessage}),
	withAuthRedirect)(Dialogs);