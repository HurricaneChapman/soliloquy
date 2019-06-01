function clearValues(state, action) {
    const clearedState = {
        ...state,
        contentField: ''
    };

    switch (action.formName) {
        case ('newReply'):
            clearedState.authorField = '';
            break;
        case ('newPost'):
            Object.assign(clearedState, {
                titleField: '',
                authorField: action.afterPost !== 'stay' ? '' : state.authorField
            });
            break;
        default:
            console.warn('unknown form reset');
            return state;
    }

    return clearedState;
}

function updateForm(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_FORM':
            return {
                ...state,
                [`${action.fieldName}Field`]: action.value
            };
        case 'RESET_FORM':
            return clearValues(state, action);
        default:
            return state;
    }
}

function newPostForm(state = {}, action) {
    if (action.formName !== 'newPost') {
        return state;
    }
    return updateForm(state, action);
}

function newReplyForm(state = {}, action) {
    if (action.formName !== 'newReply') {
        return state;
    }
    return updateForm(state, action);
}

export { newPostForm, newReplyForm };
















