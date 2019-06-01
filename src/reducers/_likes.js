import { findIndex } from 'lodash';

function incrementLikes(id, state) {
    const index = findIndex(state, item => item.id === id);
    return [
        ...state.slice(0, index), // errythang before
        {...state[index], likes: state[index].likes + 1},
        ...state.slice(index + 1) //errythang after
    ];
}

export default incrementLikes;
