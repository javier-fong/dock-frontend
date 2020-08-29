import React from 'react';
import HomePageNavBar from '../NavBar/HomePageNavBar';

const Hero = () => {
    return (
        <section className='hero'>
            <HomePageNavBar />
            {/* <img src='https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80' alt='' /> */}
            <div className='layer'></div>
            <div className='hero-div'>
                <h1>Welcome to Dock</h1>
                <p>Your one-stop application for family organizer</p>
                <a href='/register' className='hero-btn'>Get Started</a>
            </div>
        </section>
    )
}

export default Hero
