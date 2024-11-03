import React, { useState } from 'react'; // Import useState
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../App.css';
import courierImage from '../assets/image/courier.png';
import deliveryImage from '../assets/image/delivery.png';
import bulkImage from '../assets/image/bulk.jpg';
import loginAccessImage from '../assets/image/loginAccess.jpg';
import labelGenerationImage from '../assets/image/labelGeneration.jpg';
import trackingImage from '../assets/image/tracking.png';
import manageOrder from '../assets/image/manageOrder.jpg';
import costSave from '../assets/image/costSave.jpg';
import lowCostImage1 from '../assets/image/lowCost1.jpg'; // Add your own images
import lowCostImage2 from '../assets/image/lowCost2.jpg'; // Add your own images
import welcomeImage from '../assets/image/welcome.jpg'; // Replace with your images
import logisticsImage from '../assets/image/logistics.jpg';
import onlineBusinessImage from '../assets/image/onlineBusiness.jpg';
import Fade from 'react-reveal/Fade'; // Import Fade animation
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Introduction.css';
import LoginPopup from './LoginPopup'; // Import LoginPopup
import ResponsiveAppBar from './menubar';
import Footer from './Footer';

const Intro = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for managing the modal

  return (
    <div className="home-container">
      {/* Add link buttons to the top right corner */}
      <ResponsiveAppBar />
      <div className="top-right-buttons">
        {/* Set onClick to open the modal */}
        {/* <Button variant="link" onClick={() => setModalIsOpen(true)} className="button-link">Login</Button>
        <Button variant="link" href="/signup" className="button-link">Sign Up</Button> */}
      </div>

      <div className="about-background bg-light-blue py-5">
        <Container className="slider-container mt-5">
          <Carousel interval={3000}>
            <Carousel.Item>
              <img className="d-block w-100 carousel-image" src={welcomeImage} alt="Welcome" />
              <Carousel.Caption className="carousel-caption">
                <h3>Welcome to Our Logistics Solutions</h3>
                <p>Your trusted partner in delivering goods efficiently.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 carousel-image" src={logisticsImage} alt="Logistics" />
              <Carousel.Caption className="carousel-caption">
                <h3>About Our Logistics</h3>
                <p>Streamlining your shipping processes for a better experience.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 carousel-image" src={onlineBusinessImage} alt="Online Business" />
              <Carousel.Caption className="carousel-caption">
                <h3>Embracing Online Business</h3>
                <p>How the world is adapting to e-commerce and logistics.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>

        <Container>
          <div className="about-content text-center">
            <br />
            <h3 className="about-title mb-4 text-dark">COMPASSIONATE</h3>
            <p className="about-description lead mb-5 text-dark">
              Welcome to our logistics company! We specialize in providing top-notch logistics solutions to ensure your goods are transported safely and efficiently. With years of experience and a dedicated team, we aim to deliver excellence in every aspect of our service.
            </p>

            {/* ... (Rest of your existing content) ... */}
            <Row className="website-access-grid">
              <Col md={4} className="mb-3">
                {/* Card 1: How to Access the Website */}
                <Card className="bg-white shadow-sm h-100 border-light fixed-size-card">
                  <Card.Body>
                    <h5 className="about-subtitle text-primary">How to Access the Website</h5>
                    <p className="about-description text-dark">
                      To access our platform, you will need a specific ID provided by our team. Use this ID to log in and track your shipments, manage orders, and review detailed logistics reports.
                    </p>
                  </Card.Body>
                  <img src={loginAccessImage} alt="Login Access" className="medium-image" />
                </Card>
              </Col>

              <Col md={4} className="mb-3">
                {/* Card 2: Manage Orders and Shipping */}
                <Card className="bg-white shadow-sm h-100 border-light fixed-size-card">
                  <Card.Body>
                    <h5 className="about-subtitle text-primary">Manage Orders and Shipping</h5>
                    <p className="about-description text-dark">
                      Effortlessly handle your e-commerce orders. Our system automatically generates shipping labels, organizes pickups, and tracks deliveries, giving you full control and visibility over your logistics.
                    </p>
                  </Card.Body>
                  <img src={manageOrder} alt="Manage Orders" className="medium-image" />
                </Card>
              </Col>

              <Col md={4} className="mb-3">
                {/* Card 3: Save on Shipping Costs */}
                <Card className="bg-white shadow-sm h-100 border-light fixed-size-card">
                  <Card.Body>
                    <h5 className="about-subtitle text-primary">Save on Shipping Costs</h5>
                    <p className="about-description text-dark">
                      Connect with top courier services and take advantage of exclusive discounts. Our platform helps you choose the most cost-effective shipping options while optimizing delivery routes to save both time and money.
                    </p>
                  </Card.Body>
                  <img src={costSave} alt="Save Costs" className="medium-image" />
                </Card>
              </Col>
            </Row>


            {/* New Section: Low Shipping Cost */}
            <div className="home-container">
              <div className="about-background bg-light-blue py-5">
                <Container>
                  <div className="about-content text-center">
                    <Fade bottom>
                      <div className="low-cost-container py-5">
                        <h4 className="main-heading mb-4 text-dark">Fall into Easier Shipping at Minimal Rates</h4>
                        <Row className="mb-4">
                          <Col md={6} className="mb-4">
                            <p className="text-dark">
                              Discover our competitive shipping rates designed to offer you the best value for your money. Our streamlined logistics processes ensure that you get efficient shipping solutions without compromising on quality.
                            </p>
                            <p className="text-dark">
                              By leveraging advanced technology and strategic partnerships, we provide cost-effective shipping options tailored to meet your needs. Enjoy lower shipping costs and improved service quality with our expert logistics solutions.
                            </p>
                          </Col>
                          <Col md={6} className="mb-4">
                            <img src={lowCostImage1} alt="Low Shipping Cost 1" className="img-fluid shadow-sm rounded" />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} className="mb-4">
                            <img src={lowCostImage2} alt="Low Shipping Cost 2" className="img-fluid shadow-sm rounded" />
                          </Col>
                          <Col md={6} className="mb-4">
                            <p className="text-dark">
                              Our bulk shipping discounts offer substantial savings for high-volume shipments. Partner with us to benefit from reduced rates and enhanced shipping efficiency, all while maintaining high standards of service.
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Fade>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Add LoginPopup and pass modal state as props */}
      <LoginPopup modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

      <Footer></Footer>

    </div>
  );
};

export default Intro;
