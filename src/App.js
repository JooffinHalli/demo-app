import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import LoginFormContainer from './components/Login/Login';
import {initializeApp} from './redux/app-reducer';
import {compose, } from 'redux';
import {connect} from 'react-redux';
import Preloader from './common/Preloader';

const App = (props) => {

	useEffect(() => {
		props.initializeApp()
	})
	
	if (!props.initialized) {
		return <Preloader />
	} else return (
		<div className='appWrapper'>
			<HeaderContainer />
			<Nav />
			<div className='appWrapperContent'>
				<Switch>
					<Route exact path='/' render={() => <Redirect to='/Profile' />} />
					<Route path='/Profile/:userId?' render={() => <ProfileContainer />} />
					<Route path='/Dialogs' render={() => <DialogsContainer />} />
					<Route path='/News' render={() => <News />} />
					<Route path='/Music' render={() => <Music />} />
					<Route path='/Settings' render={() => <Settings />} />
					<Route path='/Users' render={() => <UsersContainer />} />
					<Route path='/Login' render={() => <LoginFormContainer />} />
					<Route path='*' render={() => <div>404 NOT FOUND</div>} />
				</Switch>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
});

export default compose(
	connect(mapStateToProps, {initializeApp}),
	withRouter)(App);