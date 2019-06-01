import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { isUndefined, throttle } from 'lodash';

// import the root reducer
import rootReducer from './reducers';

import replies from './data/replies';
import posts from './data/posts';

// create an object for default data
const defaultState = {
    posts,
    replies,
    newPostForm: {
        authorField: '',
        contentField: '',
        titleField: '',
        afterSubmitField: 'home'
    },
    newReplyForm: {
        authorField: '',
        contentField: ''
    }
};

function initState() {
    if (isUndefined(localStorage)) {
        return defaultState;
    }

    const storedState = localStorage.getItem('state');
    if (storedState === null) {
        return defaultState;
    }

    return JSON.parse(storedState);
}

function saveState(state) {
    if (isUndefined(localStorage)) {
        return;
    }

    localStorage.setItem('state', JSON.stringify(state));
}

const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(rootReducer, initState(), enhancers);
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index.js').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
export { history };
