import React, { Component } from 'react';

import Likes from './Likes';
import DeleteButton from './DeleteButton';

// Shows replies to a post

class Replies extends Component {
    renderReply(reply, i) {
        const date = new Date(reply.date);
        return (
            <article className="soliloquy-replies__reply" key={i}>
                <h3 className='soliloquy-replies__reply-author'>{reply.author}</h3>
                <p className="soliloquy-replies__reply-text">{reply.content}</p>
                <p>{date.toLocaleString('en-us')}</p>
                <Likes likes={reply.likes} handleLike={ () => this.props.addLike(reply.id, 'REPLY') } />
                <DeleteButton id={reply.id} contentType={'REPLY'} deleteContent={this.props.deleteContent} />
            </article>
        );
    }

    render() {
        const { postReplies } = this.props;
        const replies = postReplies.map( this.renderReply.bind(this) );
        return (
            <aside className="soliloquy-replies">
                <header className='soliloquy-replies__header'>
                    <h2 className="soliloquy-replies__title">
                        {`${postReplies.length} replies:`}
                    </h2>
                </header>
                { replies }
            </aside>
        );
    }

}

export default Replies;
