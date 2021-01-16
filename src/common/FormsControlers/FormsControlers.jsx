import React from 'react';
import c from './FormsControlers.module.css';

export const FormControler = ({input, meta: {error, touched}, children}) => {
	const hasError = error && touched;
	return (
		<div className={hasError ? c.error : ''}>
			<div>{children}</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}

export const Textarea = (props) => {
	const {input, meta, child, ...restProps} = props;
	return <FormControler {...props}><textarea {...input} {...restProps} /></FormControler>
}

export const Input = (props) => {
	const {input, meta, child, ...restProps} = props;
	return <FormControler {...props}><input {...input} {...restProps} /></FormControler>
}