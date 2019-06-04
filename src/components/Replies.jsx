import React, { Component } from 'react';

import Likes from './Likes';
import DeleteButton from './DeleteButton';

import '../styles/Replies.scss';

// Shows replies to a post

class Replies extends Component {
    renderReply(reply, i) {
        const date = new Date(reply.date);
        return (
            <article className="soliloquy-replies__reply" key={i}>
                <header className="soliloquy-replies__reply-meta">
                    <h3 className='soliloquy-replies__reply-author'>{reply.author}</h3>
                    <p className='soliloquy-replies__reply-date'>{date.toLocaleString('en-us')}</p>
                </header>
                <p className="soliloquy-replies__reply-text">{reply.content}</p>
                <div className="soliloquy-replies__reply-ui">
                    <Likes likes={reply.likes} handleLike={ () => this.props.addLike(reply.id, 'REPLY') } />
                    <DeleteButton id={reply.id} contentType={'REPLY'} deleteContent={this.props.deleteContent} />
                </div>
            </article>
        );
    }

    render() {
        const { postReplies } = this.props;
        const replies = postReplies.map( this.renderReply.bind(this) );
        if (postReplies.length <= 0) {
            return '';
        }

        return (
            <aside className="soliloquy-replies">
                <header className='soliloquy-replies__header'>
                    <h2 className="soliloquy-replies__title">
                        {postReplies.length} <span>replies</span>
                    </h2>
                </header>
                <div className="soliloquy-replies__content">
                    { replies }
                </div>
            </aside>
        );
    }

}

export default Replies;
