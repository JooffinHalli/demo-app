import React from 'react';
import c from './MyPosts.module.css';
import Post from './Post/Post';
import {reduxForm, Field} from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControlers/FormsControlers';

const maxLength = maxLengthCreator(10);

const NewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea}
					   name='newPost' 
					   placeholder='Enter your post'
					   validate={[required, maxLength]} />
		  	</div>
		  	<div>
		    	<button>Add post</button>
		  	</div>
		</form>
	)
}

const ReduxNewPostForm = reduxForm({form: 'NewPost'})(NewPostForm);

const MyPosts = React.memo((props) => {
	let posts = props.posts.map(post => <Post key={post.id}
											  message={post.message}
											  likeCount={post.likeCount} />);
	let onAddNewPostRedux = (value) => props.addNewPost(value.newPost);
	return (
		<div className={c.postsBlock}>
	     	my posts
	      	<div>
	      		<ReduxNewPostForm onSubmit={onAddNewPostRedux} />
	      	</div>
	      	<div className={c.posts}>
	      		{posts}
	      	</div>
	    </div>
	);
})

export default MyPosts;