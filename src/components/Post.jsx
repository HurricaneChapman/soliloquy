import React, { Component } from 'react';
import {filter, forEach} from 'lodash';
import { Link } from 'react-router';

import Likes from './Likes';
import DeleteButton from './DeleteButton';

import '../styles/Post.scss';

// Displays post info
// Hides post content field on root path

class Post extends Component {
    renderTitle(isIndex) {
        const { post } = this.props;
        if (isIndex) {
            return (
                <Link to={`/post/${post.id}`}>
                    <h2 className="soliloquy-post__title">
                        {post.title}
                    </h2>
                </Link>
            );
        }

        return (
            <h1 className="soliloquy-post__title">
                {post.title}
            </h1>
        );
    }

    render() {
        const { post, replies } = this.props;
        const isIndex = this.props.location.pathname === '/';
        const date = new Date(post.date).toLocaleString('en-us');
        const postReplies = this.props.postReplies ? this.props.postReplies : filter(replies, reply => reply.parentId === post.id);
        const replyIds = postReplies.map(item => item.id);
        return (
            <article className="soliloquy-post">
                <header className='soliloquy-post__header'>
                    <p className='soliloquy-post__author'>{post.author} posted</p>
                    { this.renderTitle(isIndex) }
                    <aside className='soliloquy-post__meta'>
                        <p className='soliloquy-post__date'>Posted {date}</p>
                        <Likes likes={post.likes} handleLike={ () => this.props.addLike(this.props.post.id, 'POST') }/>
                        { isIndex ? <p className='soliloquy-post__replies'>
                            {postReplies.length ? `${postReplies.length} Repl${postReplies.length > 1 ? 'ies' : 'y'}` : ''}
                        </p> : ''}
                    </aside>
                    <DeleteButton
                        id={post.id}
                        contentType={'POST'}
                        deleteContent={this.props.deleteContent}
                    >
                        {[
                            // Also delete all replies to this post
                            () => forEach(replyIds, id => this.props.deleteContent(id, 'REPLY')),
                            // Then send browser to root
                            () => this.props.router.push('/')
                        ]}
                    </DeleteButton>
                </header>
                { isIndex ? '' : <p className='soliloquy-post__body'>{post.content}</p> }
            </article>
        );
    }
}

export default Post;
