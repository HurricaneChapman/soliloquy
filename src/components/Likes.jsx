import React, { Component } from 'react';
import { isUndefined } from 'lodash';

class Likes extends Component {
    constructor(props) {
        super(props);
        this.handleClick = !isUndefined(this.props.handleLike) ? () => this.props.handleLike() : () => console.log('like button clicked');
    }

    render() {
        return (
            <button className={'soliloquy-like-button'} type="button" onClick={ this.handleClick }>
                &hearts; {this.props.likes}
            </button>
        );
    }
}

export default Likes;
