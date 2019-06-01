import React, { Component } from 'react';

// Reply form
// controlled by redux store

class NewReply extends Component {
    handleSubmit(e) {
        e.preventDefault();

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

    render() {
        return (
            <section className="soliloquy-new-reply">
                <h1>new reply</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="ReplyAuthor">Username</label>
                        <input
                            id='ReplyAuthor'
                            type="text"
                            name={'author'}
                            value={this.props.authorValue}
                            onChange={this.handleChange.bind(this)}
                            placeholder='Enter a user name'
                        />
                    </div>
                    <div>
                        <label htmlFor="ReplyContent">Post</label>
                        <input
                            id='ReplyContent'
                            type='text'
                            name={'content'}
                            value={this.props.contentValue}
                            onChange={this.handleChange.bind(this)}
                            placeholder='Enter some text'
                        />
                    </div>
                    <input type='submit' hidden/>
                </form>
            </section>
        );
    }
}

export default NewReply;
