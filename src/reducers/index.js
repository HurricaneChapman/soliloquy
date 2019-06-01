import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import replies from './replies';
import * as form from './forms';

const rootReducer = combineReducers({
    posts,
    replies,
    newPostForm: form.newPostForm,
    newReplyForm: form.newReplyForm,
    routing: routerReducer
});

export default rootReducer;
