// add like
function addLike(index, contentType) {
    return {
        type: 'INCREMENT_LIKES',
        index,
        contentType
    };
}

// delete reply
function deleteContent(id, contentType) {
    return {
        type: `DELETE_${contentType.toUpperCase()}`,
        id
    };
}

// submit post or reply
function formSubmit(formType = 'POST', content = '', author = 'anonymous', title = '', parentId = null) {
    return {
        type: `SUBMIT_FORM_${formType.toUpperCase()}`,
        author,
        content,
        title,
        parentId
    };
}

// update controlled post or reply form
function formChange(value, formName, fieldName) {
    return {
        type: `CHANGE_FORM`,
        fieldName,
        formName,
        value
    };
}

// reset controlled post or reply form
function formReset(formName = 'newPost', afterPost = null) {
    return {
        type: `RESET_FORM`,
        formName,
        afterPost
    };
}

export { addLike, deleteContent, formChange, formSubmit, formReset };
