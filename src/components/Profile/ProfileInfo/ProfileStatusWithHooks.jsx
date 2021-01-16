import React, {useState, useEffect} from 'react';
import c from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);
	useEffect(() => {
		setStatus(props.status)
	}, [props.status])
	const activateEditMode = () => {
		setEditMode(true)
	}
	const daactivateEditMode = () => {
		setEditMode(false)
		props.updateUserStatus(status);
	}
	const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
	   <div>
	        {
	        !editMode
	        ? <div>
	          	  <span className={c.status}
	          	  		onDoubleClick={activateEditMode}>{status}</span>
	          </div>
	        : <div>
	        	  <input onBlur={daactivateEditMode}
	        	  		 onChange={onStatusChange}
	        	  		 value={status}
	        	  		 autoFocus={true} />
	        	  <span className={c.x}
	        	  		onClick={daactivateEditMode}>X</span>
	          </div>
	        }
	   </div>
	);
}

export default ProfileStatusWithHooks;