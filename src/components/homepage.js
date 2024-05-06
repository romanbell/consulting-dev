import React, { Component } from 'react';
import ContactForm from './contactForm';
import { motion } from 'framer-motion'; 
import { useState } from 'react';


const ServiceCard = ({ title, description, details, visible, expand }) => (
    visible && (
    <motion.div  layout  className={expand? "service-card-collapsed" : "service-card-expanded"}>
      <motion.div  layout   className="service-card-title">{title}</motion.div>
      <motion.div layout  className="service-card-description">{description}</motion.div>
      {!expand && (
            <>
                <motion.div className="service-card-details">
                    <ul>
                        {Object.entries(details).map(([key, value]) => (
                        <li key={key}>+ {value}</li>
                        ))}
                    </ul>
                </motion.div>
                <button type="submit" className="learn-more-button">Learn More</button>
            </>
        )}
    </motion.div>
    )
  );
  
const services = [
{
    title: "+ Automation",
    cardName: "automation", //only used to match state variables for map
    description: "We collaborate with businesses to pinpoint and leverage automation opportunities, delivering measurable business value",
    details: {
        1: "Sample text about business automation. And even more sample text about our business automation solutions. Just adding more text to fill the page",
        2: "Testing text, providing business stakeholders with power to make more informed business decisions",
        3: "Tech stack, Python, SQL, PowerBI, Tableau, Snowflake, Databricks, AWS, Azure, etc.",
        4: "One last bullet point to fill extra space on the page here. And some more text here to fill space"
    }
},
{
    title: "+ Architecture",
    cardName: "architecture", //only used to match state variables for map
    description: "We specialize in designing systems to optimize performance and enhance operational efficiency",
    details: {
        1: "Sample text about business automation. And even more sample text about our business automation solutions. Just adding more text to fill the page",
        2: "Testing text, providing business stakeholders with power to make more informed business decisions",
        3: "Tech stack, Python, SQL, PowerBI, Tableau, Snowflake, Databricks, AWS, Azure, etc.",
        4: "One last bullet point to fill extra space on the page here. And some more text here to fill space"
    }
},
{
    title: "+ Cloud Data",
    cardName: "cloudData", //only used to match state variables for map
    description: "We enable businesses to improve scalability and drive digital transformation",
    details: {
        1: "Sample text about business automation. And even more sample text about our business automation solutions. Just adding more text to fill the page",
        2: "Testing text, providing business stakeholders with power to make more informed business decisions",
        3: "Tech stack, Python, SQL, PowerBI, Tableau, Snowflake, Databricks, AWS, Azure, etc.",
        4: "One last bullet point to fill extra space on the page here. And some more text here to fill space"
    }
},
{
    title: "+ AI / ML",
    cardName: "aiml", //only used to match state variables for map
    description:"We partner with businesses to identify and execute AI opportunities to deliver measurable business value",
    details: {
        1: "Sample text about business automation. And even more sample text about our business automation solutions. Just adding more text to fill the page",
        2: "Testing text, providing business stakeholders with power to make more informed business decisions",
        3: "Tech stack, Python, SQL, PowerBI, Tableau, Snowflake, Databricks, AWS, Azure, etc.",
        4: "One last bullet point to fill extra space on the page here. And some more text here to fill space"
    }
},
];




export default class HomePage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isCardOpen: false, // Are any cards expanded
            servicesCardsOpen: { //Which cards are expanded
                automation: false,
                architecture: false, 
                cloudData: false,
                aiml: false
            } 
        };
    }

    // toggleCard() {
    //     this.setState({
    //         isOpen: !this.state.isOpen 
    //     })
    // }

    toggleCard(service) {
        // console.log("initital state")
        // console.log(this.state)
        // if open
        if (this.state.servicesCardsOpen[service.cardName]) {
            // console.log('open, closing card')
            this.setState({
                isCardOpen: false, 
                servicesCardsOpen: { 
                    automation: false,
                    architecture: false, 
                    cloudData: false,
                    aiml: false
                } 
            })
        }
        // if closed
        else {
            // console.log('closed, opening card')
            // console.log(service.cardName)
            this.setState({
                isCardOpen: true,
                servicesCardsOpen: {
                    [service.cardName]: true
                }
            })
        }
        // console.log(this.state) 
    }


    // async componentDidMount() {}
    // componentWillUnmount() {}

    render() {  
        return(
            <div className='app'>

                <h1 className="heading"><span className='head-color'>Future proof</span> your business</h1>
                <main className="main">
                <section className="services">
                {services.map((service, index) => (
                    (!this.state.isCardOpen || this.state.servicesCardsOpen[service.cardName]) && (
                    <motion.div layout onClick={() => this.toggleCard(service)} key={index} className="service">
                        <ServiceCard layout = "position" 
                                     title={service.title}
                                     description={service.description}
                                     details={service.details}
                                     visible={!this.state.isCardOpen || this.state.servicesCardsOpen[service.cardName]}
                                     expand={!this.state.isCardOpen}
                        />
                    </motion.div>
                    )
                ))}
                </section>
   
                <ContactForm />
                </main>
            </div>
        );
    }
}