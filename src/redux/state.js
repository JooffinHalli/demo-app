import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';

let store = {
	_state: {

		profilePage: {
			posts: [
				{id: 1, message: 'Hello, how are you?', likeCount: 1},
				{id: 2, message: 'Hello, this is my first post', likeCount: 2},
				{id: 3, message: 'Hello, how are you?', likeCount: 3},
				{id: 4, message: 'Hello, how are you?', likeCount: 4},
				{id: 5, message: 'Hello, how are you?', likeCount: 5},
				{id: 6, message: 'Hello, how are you?', likeCount: 6},
			],
			newPostText: ''
		},

		messagesPage: {
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
			newMessageText: ''
		},
	},

	_callSubscriber()  {
		alert('hi');
	},

	getState() {
		return this._state;
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		profileReducer(this._state.profilePage, action);
		messagesReducer(this._state.messagesPage, action);
		
		this._callSubscriber(store);
	},
}

export default store;