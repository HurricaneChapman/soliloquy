import React, { Component } from 'react';
import { forEach } from 'lodash';

import "../styles/DeleteButton.scss";

class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.timer = null;
    }

    handleClick() {
        if (this.state.count > 0) {
            clearTimeout(this.timer);
            this.props.deleteContent(this.props.id, this.props.contentType);
            this.setState({count: 0});
            if (this.props.children) {
                forEach(this.props.children, childFunc => {
                    childFunc();
                });
            }
            return;
        }

        this.startTimer(3);
    }

    startTimer(count) {
        this.setState({ count });
        if (count > 0) {
            this.timer = setTimeout(() => this.startTimer( count - 1), 1000);
        }
    }

    render() {
        const {count} = this.state;
        return (
            <button
                className={this.state.count > 0 ? 'soliloquy-delete-button soliloquy-delete-button--confirm': 'soliloquy-delete-button'}
                type="button"
                onClick={this.handleClick.bind(this)}
                aria-label="Delete"
            >
                {
                    this.state.count === 0 ? 'Delete'
                        : <React.Fragment>Confirm <span>{ count }</span></React.Fragment>
                }
            </button>
        );
    }
}

export default DeleteButton;
