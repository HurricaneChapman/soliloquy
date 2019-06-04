import React, { Component } from 'react';

import '../styles/NewReply.scss';

// Reply form
// controlled by redux store

class NewReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                author: false,
                content: false
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        // prevent bad submissions
        const errorState = {
            author: this.props.authorValue === '',
            content: this.props.contentValue === ''
        };

        switch (true) {
            case errorState.author:
            case errorState.content:
                this.setState({errors: errorState});
                return;
            default:
            // continue
        }

        // Trigger redux submit and reset actions
        this.props.formSubmit('REPLY', this.props.contentValue, this.props.authorValue, '', this.props.parentId);
        this.props.formReset('newReply');
    }

    handleChange(e) {
        // get value and field name
        const value = e.target.value;
        const fieldName = e.target.name;

        // trigger redux action
        this.props.formChange(value, 'newReply', fieldName);
    }

    handleReset() {
        // trigger reset action in redux. All fields are wiped.
        this.props.formReset('newReply');
    }

    render() {
        return (
            <section className="soliloquy-reply-form">
                <h1 className="soliloquy-reply-form__title"><span>New Reply</span></h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className={`soliloquy-reply-form__input-wrapper ${this.props.authorValue === '' ? '' : 'soliloquy-reply-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-reply-form__label soliloquy-reply-form__label--text-input ${this.state.errors.author ? 'soliloquy-reply-form__label--error' : ''}`} htmlFor="ReplyAuthor">
                            Username
                        </label>
                        <input
                            id='ReplyAuthor'
                            type="text"
                            name={'author'}
                            value={this.props.authorValue}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className={`soliloquy-reply-form__input-wrapper ${this.props.contentValue === '' ? '' : 'soliloquy-reply-form__input-wrapper--is-dirty'}`}>
                        <label className={`soliloquy-reply-form__label soliloquy-reply-form__label--text-input ${this.state.errors.content ? 'soliloquy-reply-form__label--error' : ''}`} htmlFor="ReplyContent">
                            Reply Text
                        </label>
                        <input
                            id='ReplyContent'
                            type='text'
                            name={'content'}
                            value={this.props.contentValue}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className='soliloquy-reply-form__buttons'>
                        <button className="soliloquy-reply-form__reset" type='reset' onClick={this.handleReset.bind(this)} aria-label='Reset'>
                            Reset
                        </button>
                        <button className="soliloquy-reply-form__submit" type='submit' aria-label='Submit'>
                            Submit reply
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default NewReply;
