import React, { Component } from 'react';

import Post from './Post';
import {Link} from 'react-router';

// Lists available posts and links to their Single pages

class PostList extends Component {
    render() {
        if (!this.props.posts.length) {
            return (
                <p className='soliloquy__empty'>
                    There are no posts to display. <Link to={'/new'}>Create one</Link>
                </p>
            );
        }

        return (
            <section className='soliloquy-post-list'>
                <h1>
                   Posts
                </h1>
                {
                    this.props.posts.map((post, i) => <Post {...this.props} key={i} i={i} post={post} />)
                }
            </section>
        );
    }
}

export default PostList;
