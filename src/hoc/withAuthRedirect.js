import Login from '../components/Login/Login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


let mapStateToPropsForRedirect = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
}

export const withAuthRedirect = (Component) => {
	const RedirectComponent = (props) => {
		if (!props.isAuth) return <Redirect to='/Login' />
		return <Component {...props} />
	}
	let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
	return ConnectedRedirectComponent;
}