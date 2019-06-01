import React, { Component } from 'react';
import { forEach } from 'lodash';

class DeleteButton extends Component {
    handleClick() {
        this.props.deleteContent(this.props.id, this.props.contentType);
        if (this.props.children) {
            forEach(this.props.children, childFunc => {
                childFunc();
            });
        }
    }

    render() {
        return (
            <button type='button' onClick={this.handleClick.bind(this)} aria-label='Delete'>
                &times;
            </button>
        );
    }
}

export default DeleteButton;
