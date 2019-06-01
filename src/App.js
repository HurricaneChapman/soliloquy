import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import store, { history } from './store';
import * as actionCreators from './actions/actionCreators';
import './App.scss';

// import components
import Home from './components/Home';
import PostList from './components/PostList';
import Single from './components/Single';
import NewPost from './components/NewPost';

function mapStateToProps(state) {
    return {
        posts: state.posts,
        replies: state.replies
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

function mapNewPostProps(state) {
    return {
        authorValue: state.newPostForm.authorField,
        contentValue: state.newPostForm.contentField,
        titleValue: state.newPostForm.titleField,
        afterSubmit: state.newPostForm.afterSubmitField
    };
}

function mapNewReplyProps(state) {
    const postState = mapStateToProps(state);
    return Object.assign(postState, {
        authorValue: state.newReplyForm.authorField,
        contentValue: state.newReplyForm.contentField
    });
}

const HomeWithProps = connect(mapStateToProps, mapDispatchToProps)(Home);
const NewPostForm = connect(mapNewPostProps, mapDispatchToProps)(NewPost);
const SingleWithReplyForm = connect(mapNewReplyProps, mapDispatchToProps)(Single);

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path={'/'} component={HomeWithProps}>
                    <IndexRoute component={PostList} />
                    <Route path={'/post/:postId'} component={ SingleWithReplyForm } />
                    <Route path={'/new'} component={ NewPostForm } />
                </Route>
            </Router>
        </Provider>
    );
}

export default App;
