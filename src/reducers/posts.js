import { uuidv4 } from '../helpers';
import incrementLikes from './_likes';
import {findIndex} from 'lodash';

function posts(state = [], action) {
    switch(action.type) {
        case ('INCREMENT_LIKES'):
            if (action.contentType !== 'POST') {
                return state;
            }

            return incrementLikes(action.index, state);
        case ('SUBMIT_FORM_POST'):
            return [
                ...state,
                {
                    id: state.length,
                    author: action.author,
                    title: action.title,
                    content: action.content,
                    likes: 0,
                    date: new Date().toISOString(),
                    code: uuidv4()
                }
            ];
        case ('DELETE_POST'):
            const index = findIndex(state, item => item.id === action.id);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
}

export default posts;
