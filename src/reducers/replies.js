import { uuidv4 } from '../helpers';
import incrementLikes from './_likes';
import {findIndex} from 'lodash';

function replies(state = [], action) {
    switch(action.type) {
        case ('INCREMENT_LIKES'):
            if (action.contentType !== 'REPLY') {
                return state;
            }

            return incrementLikes(action.index, state);
        case ('SUBMIT_FORM_REPLY'):
            return [
                ...state,
                {
                    id: state.length,
                    parentId: action.parentId,
                    author: action.author,
                    content: action.content,
                    likes: 0,
                    date: new Date().toISOString(),
                    code: uuidv4()
                }
            ];
        case 'DELETE_REPLY':
            const index = findIndex(state, item => item.id === action.id);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
}

export default replies;
