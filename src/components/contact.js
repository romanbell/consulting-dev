import React, { Component } from 'react';
import ContactForm from './contactForm';

export default class ContactPage extends Component {
    
    async componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return(
            <div className='app'>
                <h2 className="contact-heading">Contact Us </h2>
                <p className="contact-subheading">  Roman and Jeff are working tirelessly to build the rest of htis page</p>
                <ContactForm />
            </div>
        );
    }
}