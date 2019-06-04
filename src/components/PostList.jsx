import React, { Component } from 'react';

import Post from './Post';
import {Link} from 'react-router';

import '../styles/PostList.scss';

// Lists available posts and links to their Single pages

class PostList extends Component {
    render() {
        if (!this.props.posts.length) {
            return (
                <section className="soliloquy-post-list">
                    <p className='soliloquy-post-list__empty'>
                        There are no posts to display.
                    </p>
                    <Link className='soliloquy-post-list__new-post-button' to={'/new'} title="Create New Post">
                        New Post
                    </Link>
                </section>
            );
        }

        return (
            <section className="soliloquy-post-list">
                <h3 className="soliloquy-post-list__title">
                   Soliloquy Posts
                </h3>
                {
                    this.props.posts.map((post, i) => <Post {...this.props} key={i} i={i} post={post} />)
                }
            </section>
        );
    }
}

export default PostList;
