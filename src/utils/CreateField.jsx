import {Field} from 'redux-form';

export const createField = (type, validators, placeholder, name, Component) => {
	return <div><Field type={type}
					   validate={validators}
					   placeholder={placeholder}
					   name={name}
					   component={Component}/></div>
}
