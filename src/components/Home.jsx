import React, { Component } from 'react';
import { Link } from 'react-router';

import logo from '../logo.svg';

import '../styles/soliloquy.scss';


class Home extends Component {
    render () {
        return (
            <main className="soliloquy">
                <header className="soliloquy__header">
                    <img src={logo} className="soliloquy-logo" alt="logo" width={'50'}/>
                    <h3>
                        <Link to={'/'}>
                            Soliloquy
                        </Link>
                    </h3>
                    <nav>
                        <Link to={'/new'}>
                            New post+
                        </Link>
                    </nav>
                </header>
                {
                    this.props.children !== null ?
                        React.cloneElement(this.props.children, this.props) : ''
                }
            </main>
        );
    }
}

export default Home;
