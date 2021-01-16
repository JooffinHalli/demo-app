const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
	dialogs: [
		{id: 1, name: 'Thor'},
		{id: 2, name: 'Bjorn'},
		{id: 3, name: 'Ragnar'},
		{id: 4, name: 'Olaf'},
		{id: 5, name: 'Rollo'},
		{id: 6, name: 'Odin'},
	],
	messages: [
		{id: 1, message: 'Hello'},
		{id: 2, message: 'Hello'},
		{id: 3, message: 'Hello'},
		{id: 4, message: 'Hello'},
		{id: 5, message: 'Hello'},
		{id: 6, message: 'Hello'},
	],
};

const messagesReducer = (state = initialState, action) => {

	switch (action.type) {
		case SEND_MESSAGE:
			let newMessage = {id: 7, message: action.newMessageText};
			return {
				...state,
				messages: [...state.messages, newMessage],
			};
		default:
			return state;
	}
}

export const sendNewMessage = (newMessageText) => ({type: SEND_MESSAGE, newMessageText});

export default messagesReducer;