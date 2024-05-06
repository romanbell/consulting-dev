import React, { Component } from 'react';
import { motion } from 'framer-motion'; 


export default class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCardOpen: false, 
            } 
        };

    toggleCard() {
        this.setState({
            isCardOpen: !this.state.isCardOpen
        })
    }

    render() {
        return(
            <div className='app'>
                <h2 className="contact-heading">Our <span className='head-color'>Success</span> Stories </h2>
                <section className='portfolio-content'>
                    <motion.div layout onClick={() => this.toggleCard()} className='portfolio-block-collapsed'>
                        <motion.div className="portfolio-flex-title-and-logos">
                            <motion.p className='portfolio-block-title'>Data Driven Insights To Increase Customer Retention</motion.p>
                            <motion.div className="portfolio-tech-blocks">
                                <motion.p className="portfolio-python">Python</motion.p>
                                <motion.p className="portfolio-sql">SQL</motion.p>
                                <motion.p className="portfolio-powerbi">PowerBI</motion.p>
                                <motion.p className="portfolio-kubernetes">Kubernetes</motion.p>
                                <motion.p className="portfolio-azure">Azure</motion.p>
                            </motion.div>
                        </motion.div>

                        <motion.p className='portfolio-block-caption'>Customers were leaving and our client struggled to stop the bleeding! We partnered with the business to identify key factors for why clients were dissatisfied with the provided services and significantly increased customer retention.</motion.p>
                        {this.state.isCardOpen && (
                        <> 
                            <motion.p className='portfolio-block-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id ligula at nunc malesuada lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In massa sapien, molestie facilisis neque quis, euismod vulputate quam. Sed sem ligula, bibendum et tempor eget, luctus at tortor. Nullam porta, diam nec mollis fermentum, dui lacus suscipit elit, vitae volutpat lacus enim at orci. Donec tempus euismod velit nec porta. Donec accumsan eu turpis porttitor viverra. Praesent interdum dictum arcu, vitae mollis orci scelerisque congue. Donec cursus rutrum lacus, at consectetur nisi dapibus eget. Aenean vitae fermentum est. Integer malesuada iaculis fringilla. In blandit nibh quis nulla consequat, ut vulputate odio dignissim. Donec sit amet dui ac nulla interdum ullamcorper non vel risus.</motion.p>

                            <motion.p className='portfolio-block-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id ligula at nunc malesuada lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In massa sapien, molestie facilisis neque quis, euismod vulputate quam. Sed sem ligula, bibendum et tempor eget, luctus at tortor. Nullam porta, diam nec mollis fermentum, dui lacus suscipit elit, vitae volutpat lacus enim at orci. Donec tempus euismod velit nec porta. Donec accumsan eu turpis porttitor viverra. Praesent interdum dictum arcu, vitae mollis orci scelerisque congue. Donec cursus rutrum lacus, at consectetur nisi dapibus eget. Aenean vitae fermentum est. Integer malesuada iaculis fringilla. In blandit nibh quis nulla consequat, ut vulputate odio dignissim. Donec sit amet dui ac nulla interdum ullamcorper non vel risus.</motion.p>

                            <motion.p className='portfolio-block-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id ligula at nunc malesuada lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In massa sapien, molestie facilisis neque quis, euismod vulputate quam. Sed sem ligula, bibendum et tempor eget, luctus at tortor. Nullam porta, diam nec mollis fermentum, dui lacus suscipit elit, vitae volutpat lacus enim at orci. Donec tempus euismod velit nec porta. Donec accumsan eu turpis porttitor viverra. Praesent interdum dictum arcu, vitae mollis orci scelerisque congue. Donec cursus rutrum lacus, at consectetur nisi dapibus eget. Aenean vitae fermentum est. Integer malesuada iaculis fringilla. In blandit nibh quis nulla consequat, ut vulputate odio dignissim. Donec sit amet dui ac nulla interdum ullamcorper non vel risus.</motion.p>
                        </>
                        )}
                        {!this.state.isCardOpen && (
                        <motion.button type="submit" className="portfolio-learn-more-button">Learn More</motion.button>
                        )}
                    </motion.div>
                </section>
            </div>  
        );
    }
}