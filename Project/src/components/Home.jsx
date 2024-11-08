import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import courierImage from '../assets/image/courier.png';
import deliveryImage from '../assets/image/delivery.png';
import bulkImage from '../assets/image/bulk.jpg';
import loginAccessImage from '../assets/image/loginAccess.jpg';
import labelGenerationImage from '../assets/image/labelGeneration.jpg';
import trackingImage from '../assets/image/tracking.png';
import lowCostImage1 from '../assets/image/lowCost1.jpg'; // Add your own images
import lowCostImage2 from '../assets/image/lowCost2.jpg'; // Add your own images
import welcomeImage from '../assets/image/welcome.jpg'; // Replace with your images
import logisticsImage from '../assets/image/logistics.jpg';
import onlineBusinessImage from '../assets/image/onlineBusiness.jpg';
import Fade from 'react-reveal/Fade'; // Import Fade animation
import { Carousel } from 'react-bootstrap';
import Header from './Header'; 
import ResponsiveAppBar from './menubar';
import Footer from './Footer';
 // Adjust the import path based on your file structure.

// Import your Header component

const Home = () => {
  return (
    <div className="home-container">
      <ResponsiveAppBar/>
      {/* The DashboardLayoutBasic component with the side menu */}
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

            <Row className="about-grid">
              <Col md={6} className="mb-4">
                <h5 className="about-subtitle text-primary">Our Vision</h5>
                <p className="about-text text-dark">
                  To be the leading provider of innovative logistics solutions, recognized for our commitment to quality, reliability, and customer satisfaction.
                </p>
              </Col>
              <Col md={6} className="mb-4">
                <h5 className="about-subtitle text-primary">Experience in Industry</h5>
                <p className="about-text text-dark">
                  To deliver exceptional logistics services by leveraging technology, expertise, and a customer-centric approach, ensuring timely and secure transportation of goods.
                </p>
              </Col>
            </Row>

            <h4 className="about-title mb-4 text-dark">Our Aim</h4>
            <p className="about-description mb-5 text-dark">
              In logistics, the aim is to create an efficient and reliable supply chain that minimizes costs and maximizes customer satisfaction.
            </p>

            <Row className="about-grid text-dark mb-5 justify-content-center animate-on-scroll">
              <Col md={4} className="mb-4 d-flex align-items-stretch">
                <Card className="custom-card shadow-sm border-primary w-100">
                  <Card.Img variant="top" src={courierImage} alt="Service 1" />
                  <Card.Body>
                    <Card.Text className="text-dark">Commitment with Courier Companies</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4 d-flex align-items-stretch">
                <Card className="custom-card shadow-sm border-primary w-100">
                  <Card.Img variant="top" src={deliveryImage} alt="Service 2" />
                  <Card.Body>
                    <Card.Text className="text-dark">Real-time Tracking</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4 d-flex align-items-stretch">
                <Card className="custom-card shadow-sm border-primary w-100">
                  <Card.Img variant="top" src={bulkImage} alt="Service 3" />
                  <Card.Body>
                    <Card.Text className="text-dark">Bulk Ordering</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h4 className="about-title mb-3 text-dark">Access Our Website, Track shipments, Parcel Labeling</h4>

            <Row className="website-access-grid">
              <Col md={4} className="mb-3">
                <Card className="bg-white shadow-sm h-100 border-light">
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
                <Card className="bg-white shadow-sm h-100 border-light">
                  <Card.Body>
                    <h5 className="about-subtitle text-primary">Track your Shipment</h5>
                    <p className="about-description text-dark">
                      To access our platform, you will need a specific ID provided by our team. Use this ID to log in and track your shipments, manage orders, and review detailed logistics reports.
                    </p>
                  </Card.Body>
                  <img src={trackingImage} alt="shipment" className="medium-image" />
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="bg-white shadow-sm h-100 border-light">
                  <Card.Body>
                    <h5 className="about-subtitle text-primary">Label Generation for Parcels</h5>
                    <p className="about-description text-dark">
                      You can generate labels for your parcels by accessing the label generation feature on your dashboard. Simply enter the parcel details, and download or print the label for quick and secure dispatch.
                    </p>
                  </Card.Body>
                  <img src={labelGenerationImage} alt="Label Generation" className="medium-image" />
                </Card>
              </Col>
            </Row>

            {/* New Section: Low Shipping Cost */}
            <div className="home-container">
              <div className="about-background bg-light-blue py-5">
                <Container>
                  <div className="about-content text-center">
                    {/* Existing content */}

                    {/* New Section: Low Shipping Cost with Fade Animation */}
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
                              Experience hassle-free shipping with our affordable rates and efficient logistics solutions. Join us in redefining the logistics landscape!
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Fade>
                    {/* End of New Section */}
                  </div>
                </Container>
              </div>
            </div>
            {/* End of low cost section */}
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
