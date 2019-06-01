import React, { Component } from 'react';

// Post form
// controlled by redux store

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.runAfterUpdate = () => {};
    }

    handleSubmit(e) {
        e.preventDefault();

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
            <section className="soliloquy-new-post">
                <h1>new post</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="FieldAuthor">Username</label>
                        <input
                            id='FieldAuthor'
                            type="text"
                            name={'author'}
                            value={this.props.authorValue}
                            onChange={this.handleChange.bind(this)}
                            placeholder='Enter a user name'
                        />
                    </div>
                    <div>
                        <label htmlFor="FieldTitle">Title</label>
                        <input
                            id='FieldTitle'
                            type="text"
                            name={'title'}
                            value={this.props.titleValue}
                            onChange={this.handleChange.bind(this)}
                            placeholder='Enter a title for your post'
                        />
                    </div>
                    <div>
                        <label htmlFor="FieldContent">Post</label>
                        <textarea
                            id='FieldContent'
                            name={'content'}
                            value={this.props.contentValue}
                            onChange={this.handleChange.bind(this)}
                            placeholder='Enter some text'
                        />
                    </div>
                    <div>
                        <label htmlFor="AfterSubmit">After posting</label>
                        <select name="afterSubmit" id="AfterSubmit" value={this.props.afterSubmit} onChange={this.handleChange.bind(this)}>
                            <option value="stay">Stay here and keep posting</option>
                            <option value="home">Return to Homepage</option>
                            <option value="view">View the post</option>
                        </select>
                    </div>
                    <button type='reset' onClick={this.handleReset.bind(this)} aria-label='Reset'>Reset</button>
                    <button type='submit' aria-label='Submit'>Submit</button>
                </form>
            </section>
        );
    }
}

export default NewPost;
