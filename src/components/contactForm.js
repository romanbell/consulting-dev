import React, { Component } from 'react';

export default class ContactForm extends Component {
    
    async componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return(
            <section className="contact">
            <h2 className="contact-heading">Make the future your <span className='head-color'>reality</span></h2>
            <p className="contact-description">
                OSC works closely with you to identify and tackle critical technological and business
                questions to drive business value
            </p>
            <form className="contact-form">
                <div className="form-row">
                <textarea className="form-input" type="text" id="fullName" placeholder="Full Name" />
                <textarea className="form-input" type="email" id="email" placeholder="Email" />
                </div>
                <div className="form-row">
                <textarea className="form-input" type="text" id="company" placeholder="Company" />
                <textarea className="form-input" type="text" id="jobTitle" placeholder="Job Title" />
                </div>
                <div className="form-row">
                {/* <label htmlFor="message">Write your message here (optional)</label> */}
                <textarea className="message-form-input" id="message" placeholder="Write your message here (optional)"></textarea>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            </section>

        );
    }
}