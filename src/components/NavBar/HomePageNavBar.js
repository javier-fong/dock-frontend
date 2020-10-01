import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBarLandingPage extends Component {
    state = { className: '' };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 0) {
            if (!this.state.className) {
                this.setState({ className: 'affix' });
            }
        } else {
            if (this.state.className) {
                this.setState({ className: '' });
            }
        }
    }

    render() {
        return (
            <section id='navbar-landing'>
                <nav className={`nav searchDiv ${this.state.className}`}>
                    <div className='container'>
                        <div className='logo'>
                            <Link to='/'>Dock</Link>
                        </div>
                        <div id='mainListDiv' className='main_list'>
                            <Link to='/'>Home</Link>
                            {/* <Link to='/about'>About</Link> */}
                            <Link to='/register'>Get Started</Link>
                            <Link to='/login'>Log In</Link>
                        </div>
                    </div>
                </nav>
            </section>
        )
    }
}

export default NavBarLandingPage
