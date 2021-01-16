import React, {useState} from 'react';
import c from './ProfileInfo.module.css';
import userPhoto from '../../../assets/user.png';
import Preloader from '../../../common/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {createField} from '../../../utils/CreateField';
import {Input, Textarea} from '../../../common/FormsControlers/FormsControlers';
import {reduxForm} from 'redux-form';

const ProfileFormData = ({contacts, handleSubmit, error}) => {
    return (
        <div>
            {error && <div className={c.error}>{error}</div>}
            <form onSubmit={handleSubmit} >
                <button>save</button>
                <div><b>About me </b>{createField('', [], 'About me', 'aboutMe', Input)}</div>
                <div><b>Full name </b>{createField('', [], 'Full name', 'fullName', Input)}</div>
                <div><b>Looking a job </b>{createField('checkbox', [], '', 'lookingForAJob', Input)}</div>
                <div><b>My skills </b>{createField('', [], 'My skills', 'lookingForAJobDescription', Textarea)}</div>

                {Object.keys(contacts).map(key => {
                    return <div key={key}><b>{key} </b>{createField('', [], `link on your ${key}`, `contacts.${key}`, Input)}</div>
                })}
            </form>
        </div>
    )
}

const ReduxProfileFormData = reduxForm({form: 'ProfileData'})(ProfileFormData);

const ProfileData = (props) => {
    return (
        <div>
            <button onClick={() => {props.setEditMode(true)}}>change</button>
            <div><b>About me: </b>{props.aboutMe}</div>
            <div><b>Full name: </b>{props.fullName}</div>
            <div><b>Looking a job: </b>{props.lookingForAJob ? 'yes' : 'no'}</div>
            <div><b>My skills: </b>{props.lookingForAJobDescription || 'no'}</div>
            <div><b>Contacts:</b></div>
            <div>
                {Object.keys(props.contacts).map(key => {
                    return <div className={c.cont} key={key}><b>{key} </b>{<a href={props.contacts[key]}>{props.contacts[key]}</a> || 'no'}</div>
                })}
            </div>
        </div>
    ) 
}

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)
    let downloadPhoto = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    let onSubmit = (formData) => {
       props.getUserProfileData(formData).then(() => setEditMode(false));
    }
    if (!props.profile) {
        return <Preloader />
    }
	return (
		<div>
		    <div>
		        <img className={c.ava} src={props.profile.photos.large || userPhoto} alt='ava' />
		        {props.isOwner && <input type='file' onChange={downloadPhoto} />}
		    </div>
		    <div>
                <ProfileStatusWithHooks status={props.status}
                               			updateUserStatus={props.updateUserStatus} />
                {editMode
                ? <ReduxProfileFormData initialValues={props.profile} onSubmit={onSubmit} {...props.profile} setEditMode={setEditMode} />
                : <ProfileData {...props.profile} setEditMode={setEditMode} />
                }
		    </div>
     	</div>
	);
}

export default ProfileInfo;