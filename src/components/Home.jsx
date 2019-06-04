import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.navLinks = [
            {
                title: 'Home',
                text: 'All posts',
                path: '/'
            },
            {
                title: 'Create New Post',
                text: 'New post',
                path: '/new'
            }
        ];
    }

    renderNavLinks(currentPath) {
        return this.navLinks.map((item, i) => {
            const linkClass = item.path === currentPath ? 'soliloquy__nav-link soliloquy__nav-link--active' : 'soliloquy__nav-link';
            return (
                <React.Fragment key={i}>
                    <Link className={linkClass} to={item.path} title={item.title}>
                        {item.text}
                    </Link>
                </React.Fragment>
            );
        });
    }

    renderFooter(currentPath) {
        return (
            <footer className='soliloquy__footer'>
                { currentPath === '/' ?
                    <Link className='soliloquy__new-post-button' to={'/new'} title="Create New Post">
                        New Post
                    </Link>
                    : <Link className='soliloquy__home-button' to={'/'} title="Back to home">
                        Back to home
                    </Link>
                }
            </footer>
        );
    }

    render () {
        const navElements = this.renderNavLinks(this.props.router.location.pathname);
        return (
            <main className="soliloquy">
                <header className="soliloquy__header">
                    <h3 className="soliloquy__title">
                        <Link to={'/'} title="home">
                            Soliloquy <span className="soliloquy__version">v0.1</span>
                        </Link>
                    </h3>
                    <p className="soliloquy__subtitle">The act of speaking one's thoughts aloud when alone or regardless of any audience</p>
                    <nav className="soliloquy__nav">
                        {navElements}

                    </nav>
                </header>
                {
                    this.props.children !== null ?
                        React.cloneElement(this.props.children, this.props) : ''
                }
                { this.props.posts.length ? this.renderFooter(this.props.router.location.pathname) : '' }
            </main>
        );
    }
}

export default Home;
