import React, { Component } from 'react';

import '../styles/NewPost.scss';

// Post form
// controlled by redux store

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.runAfterUpdate = () => {};
        this.state = {
            errors: {
                author: false,
                title: false,
                content: false
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // prevent bad submissions
        const errorState = {
            author: this.props.authorValue === '',
            title: this.props.titleValue === '',
            content: this.props.contentValue === ''
        };

        switch (true) {
            case errorState.author:
            case errorState.title:
            case errorState.content:
                this.setState({errors: errorState});
                return;
            default:
                // continue
        }

        // Trigger redux submit action
        this.props.formSubmit('POST', this.props.contentValue, this.props.authorValue, this.props.titleValue);

        // Depending on user choice, our reset action has a few different outcomes.
        // If the user chooses to stay on the new form page, we do not reset the author field. This is the default case.
        // Otherwise, all fields are reset and we redirect the user to either home or their new single post page
        // The logic for this is in the reducer.
        switch (this.props.afterSubmit) {
            case 'home' :
                this.props.formReset('newPost');
                this.props.router.push('/');
                break;
            case 'view' :
                this.props.formReset('newPost');
                this.runAfterUpdate = (newId) => this.props.router.push(`/post/${newId}`);
                break;
            default:
                this.props.formReset('newPost', this.props.afterSubmit);
        }
    }

    handleChange(e) {
        // get value and field name
        const value = e.target.value;
        const fieldName = e.target.name;

        // trigger action in redux
        this.props.formChange(value, 'newPost', fieldName);
    }

    handleReset() {
        // trigger reset action in redux. All fields are wiped.
        this.props.formReset('newPost');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.posts.length !== this.props.posts.length) {
            const newId = this.props.posts[this.props.posts.length - 1].id;
            this.runAfterUpdate(newId);
        }
    }

    render() {
        return (
            <section className="soliloquy-post-form">
                <h1 className="soliloquy-post-form__title">New post</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className={`soliloquy-post-form__input-wrapper ${this.props.authorValue === '' ? '' : 'soliloquy-post-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-post-form__label soliloquy-post-form__label--text-input ${this.state.errors.author ? 'soliloquy-post-form__label--error' : ''}`} htmlFor="FieldAuthor">Username</label>
                        <input
                            id='FieldAuthor'
                            type="text"
                            name={'author'}
                            value={this.props.authorValue}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className={`soliloquy-post-form__input-wrapper ${this.props.titleValue === '' ? '' : 'soliloquy-post-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-post-form__label soliloquy-post-form__label--text-input ${this.state.errors.title ? 'soliloquy-post-form__label--error' : ''}`} htmlFor="FieldTitle">Title</label>
                        <input
                            id='FieldTitle'
                            type="text"
                            name={'title'}
                            value={this.props.titleValue}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className={`soliloquy-post-form__input-wrapper ${this.props.contentValue === '' ? '' : 'soliloquy-post-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-post-form__label soliloquy-post-form__label--textarea ${this.state.errors.content ? 'soliloquy-post-form__label--error' : ''}`} htmlFor="FieldContent">Post</label>
                        <textarea
                            id='FieldContent'
                            name={'content'}
                            value={this.props.contentValue}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className={`soliloquy-post-form__input-wrapper ${this.props.contentValue === '' ? '' : 'soliloquy-post-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-post-form__label soliloquy-post-form__label--select`} htmlFor="AfterSubmit">After posting</label>
                        <svg className="soliloquy-svg-select-icon" width="16" height="16" viewBox="0 0 16 16"> <path fill="#000000" d="M16 8c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zM1.5 8c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5z"/> <path fill="#000000" d="M4.957 5.543l-1.414 1.414 4.457 4.457 4.457-4.457-1.414-1.414-3.043 3.043z"/> </svg>
                        <select name="afterSubmit" id="AfterSubmit" value={this.props.afterSubmit} onChange={this.handleChange.bind(this)}>
                            <option value="stay">Stay here and keep posting</option>
                            <option value="home">Return to Homepage</option>
                            <option value="view">View the post</option>
                        </select>
                    </div>
                    <div className='soliloquy-post-form__buttons'>
                        <button type='reset' onClick={this.handleReset.bind(this)} aria-label='Reset'>Reset</button>
                        <button type='submit' aria-label='Submit'>Submit post</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default NewPost;
