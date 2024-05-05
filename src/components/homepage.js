import React, { Component } from 'react';
import ContactForm from './contactForm';


const ServiceCard = ({ title, description }) => (
    <div className="service-card">
      <div className="service-card-title">{title}</div>
      <div className="service-card-description">{description}</div>
    </div>
  );
  
  const services = [
    {
      title: "+ Automation",
      description:
        "We collaborate with businesses to pinpoint and leverage automation opportunities, delivering measurable business value",
    },
    {
      title: "+ Architecture",
      description:
        "We specialize in designing systems to optimize performance and enhance operational efficiency",
    },
    {
      title: "+ Cloud Data",
      description: "We enable businesses to improve scalability and drive digital transformation",
    },
    {
      title: "+ AI / ML",
      description:
        "We partner with businesses to identify and execute AI opportunities to deliver measurable business value",
    },
  ];


export default class HomePage extends Component {
    
    async componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return(
            <div className='app'>

                <h1 className="heading"><span className='head-color'>Future proof</span> your business</h1>
                <main className="main">
                <section className="services">
                {services.map((service, index) => (
                    <div key={index} className="service">
                    <ServiceCard title={service.title} description={service.description} />
                    </div>
                ))}
                </section>
   
                <ContactForm />
                </main>
            </div>
        );
    }
}