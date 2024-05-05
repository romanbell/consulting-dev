



import React, { Component } from 'react';

export default class Header extends Component {
    
    async componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return(
            <header className="header">
            <div className="logo">
            <div className="company-name">J & R Technologies</div>
            </div>
            <nav className="navigation">
                <a href="/" className="nav-link">Home</a>
                <a href="/portfolio" className="nav-link">Portfolio</a>
                <a href="/newsletter" className="nav-link">Newsletter</a>
                <a href="/about" className="nav-link">About Us</a>
                <a href="/contact" className="nav-link"><span className='nav-link-dark'>Contact Us</span></a>
            </nav>
            </header>
        );
    }
}