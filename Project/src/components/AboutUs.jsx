import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure icons are available
import { motion } from 'framer-motion';
import './AboutUs.css'; // Custom CSS for additional styles

const AboutUs = () => {
    // Define animation variants for different sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    // Animation variants for team members
    const memberVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: { opacity: 1, scale: 1, rotate: 0 },
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ duration: 0.5 }}
            className="container-fluid"
        >
            {/* About Us Section */}
            <motion.section
                className="about-us-section text-center my-5"
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                transition={{ duration: 0.5 }}
            >
                {/* Color Bar with Logo and Heading */}
                <div className="d-flex align-items-center justify-content-center bg-primary text-white py-3">
                    <img
                        src="/src/assets/logo.PNG"
                        alt="ELMS Logo"
                        className="img-fluid me-3"
                        style={{ maxWidth: '50px', height: 'auto' }}
                    />
                    <h1 className="display-4 fw-bold mb-0">About Us</h1>
                </div>

                {/* Slogan */}
                <motion.p
                    className="lead text-muted my-4"
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Empowering E-commerce Logistics with Innovation and Excellence
                </motion.p>
            </motion.section>

            {/* Content Section */}
            <section className="row my-5">
                {/* Left Column */}
                <motion.div
                    className="col-md-6"
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    transition={{ duration: 0.6 }}
                >
                    {/* Our Mission */}
                    <div className="mb-5 p-4" style={{ backgroundColor: '#f9f9f9', borderLeft: '5px solid #0d6efd' }}>
                        <h2 className="fw-bold mb-4" style={{ color: '#0d6efd' }}>Our Mission</h2>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>
                            At E-commerce Logistic Management System (ELMS), our mission is to revolutionize logistics for e-commerce businesses through seamless integration, automation, and cost-effective solutions.
                        </p>
                    </div>

                    {/* Our Story */}
                    <div className="mb-5 p-4" style={{ backgroundColor: '#eef2f7', borderLeft: '5px solid #ffc107' }}>
                        <h2 className="fw-bold mb-4" style={{ color: '#ffc107' }}>Our Story</h2>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>
                            Established in [Year], ELMS was founded with the goal of streamlining logistics for online retailers. We are committed to continuous improvement and innovation to meet the evolving needs of the e-commerce sector.
                        </p>
                    </div>

                    {/* What We Do */}
                    <div className="mb-5 p-4" style={{ backgroundColor: '#f9f9f9', borderLeft: '5px solid #198754' }}>
                        <h2 className="fw-bold mb-4" style={{ color: '#198754' }}>What We Do</h2>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>
                            ELMS offers a comprehensive suite of tools designed to simplify the complexities of e-commerce logistics. Our platform integrates multiple courier services, automates order processing, and provides real-time tracking, ensuring a seamless experience from order placement to delivery.
                        </p>
                    </div>

                    {/* Intercity Bike Delivery */}
                    <div className="d-flex align-items-start mb-4 p-4" style={{ backgroundColor: '#eef2f7', borderLeft: '5px solid #dc3545' }}>
                        <motion.img 
                            src="/src/assets/bike.jpg" 
                            alt="Intercity Bike Delivery"
                            className="img-fluid rounded shadow-lg me-4"
                            style={{ width: '150px' }}
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                        />
                        <div>
                            <h2 className="fw-bold mb-4" style={{ color: '#dc3545' }}>Intercity Bike Delivery</h2>
                            <p className="text-muted" style={{ lineHeight: '1.6' }}>
                                Our intercity bike delivery service is designed to offer fast and efficient delivery for your e-commerce shipments. Ideal for urgent deliveries and reducing last-mile logistics costs, our bike delivery service ensures timely and reliable transportation across cities.
                            </p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <h2 className="fw-bold mb-4" style={{ color: '#0d6efd' }}>Why Choose Us?</h2>
                    <ul className="list-unstyled text-muted">
                        <li><i className="bi bi-check-circle me-2"></i> Efficient Logistics Integration</li>
                        <li><i className="bi bi-check-circle me-2"></i> Automated Order Processing</li>
                        <li><i className="bi bi-check-circle me-2"></i> Cost-Effective Delivery Solutions</li>
                        <li><i className="bi bi-check-circle me-2"></i> High-Quality Packaging Materials</li>
                        <li><i className="bi bi-check-circle me-2"></i> Real-Time Tracking and Updates</li>
                        <li><i className="bi bi-check-circle me-2"></i> Intercity Bike Delivery</li>
                    </ul>
                </motion.div>

                {/* Right Column: Image Section with Overlay Text */}
                <motion.div
                    className="col-md-6 position-relative"
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <img src="/src/assets/courier.jpg" alt="Our Workspace" className="img-fluid rounded shadow-lg" />
                    <div className="overlay-text position-absolute top-50 start-50 translate-middle text-center text-white">
                        <h3 className="fw-bold">Transforming E-commerce Logistics</h3>
                        <p className="lead">Innovative Solutions for Your Delivery Needs</p>
                    </div>
                </motion.div>
            </section>

            {/* Meet the Team Section */}
            <motion.section 
                className="my-5"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                transition={{ duration: 0.6 }}
            >
                <h2 className="fw-bold text-center mb-4" style={{ color: '#0d6efd' }}>Meet the Team</h2>
                <div className="row justify-content-center">
                    {/* Team Members */}
                    {[
                        { name: 'Sharaf Hussain', role: 'CEO & Founder', image: '/src/assets/sir.jpg' },
                        { name: 'Nisar Ali', role: 'CTO', image: '/src/assets/head.jpg' },
                        { name: 'Sabeerah Khurram', role: 'SMM', image: '/src/assets/SABS.jpg' },
                        { name: 'Umme Kulsoom', role: 'Manager', image: '/src/assets/kul.jpeg' },
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            variants={memberVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="col-12 col-md-6 col-lg-3 mb-3"
                        >
                            <div className="card text-center shadow-sm border-light" style={{ maxWidth: '20rem' }}>
                                <img src={member.image} alt={member.name} className="card-img-top rounded-circle mx-auto mt-4" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{member.name}</h5>
                                    <p className="card-text text-muted">{member.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
};

export default AboutUs;
