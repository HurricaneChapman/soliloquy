import React, { Component } from 'react';
import { filter, findIndex } from 'lodash';

import Post from './Post';
import Replies from './Replies';
import NewReply from './NewReply';

// Single post display
// with Replies and reply form

class Single extends Component {
    constructor(props) {
        super(props);

        this.postId = parseInt(this.props.params.postId, 10);
        this.postIndex = findIndex(this.props.posts, post => post.id === this.postId);

        if (this.postIndex === -1) {
            // catch bad post IDs and send browser to root
            this.props.router.push('/');
        }
    }

    render() {
        const { replies } = this.props;
        const { postId } = this;
        const post = this.props.posts[this.postIndex];
        const postReplies = filter(replies, reply => reply.parentId === postId);
        return (
            <section className='soliloquy-single'>
                <Post {...this.props} post={post} postReplies={postReplies} />
                <Replies postReplies={postReplies} {...this.props} />
                <NewReply {...this.props} parentId={postId} />
            </section>
        );
    }
}

export default Single;
