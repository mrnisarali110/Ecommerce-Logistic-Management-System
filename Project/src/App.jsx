import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import LoginPopup from "./components/LoginPopup";
import FileUpload from "./FileUpload";
import TrackingPage from "./components/TrackingPage";
import Faq from "./components/Faq";
import PrivacySecurity from "./components/PrivacySecurity";
import Footer from "./components/Footer"; // Footer is already imported
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ShippingPolicy from "./components/ShippingPolicy";
// import Profile from './components/Profile';
import Business from "./components/Business";
import UserOrders from "./components/UserOrders";
import AdminDashboard from "./components/AdminDashboard";
import OrdersDashboard from "./components/OrdersDashboard";
import Home from "./components/Home";
import Intro from "./components/Introduction";
import ManualForm from "./components/ManualForm";
import "./App.css";
import UserDetails from "./components/UserDetail";
import logisticsLogo from "./assets/image/logisticsLogo.png"; // Add your logo here
import UserProfile from './components/UserProfile';
import ChatbotApp from "./components/ChatbotApp";


function App() {

  const token = localStorage.getItem('token')
  console.log('tokennnn',token)
  // useEffect(() => {
    //     const tawkScript = document.createElement('script');
  //     tawkScript.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/default';
  //     tawkScript.async = true;
  //     tawkScript.charset = 'UTF-8';
  //     tawkScript.setAttribute('crossorigin', '*');
  //     document.body.appendChild(tawkScript);
  //   }, []);
  useEffect(()=>{
  const token = localStorage.getItem('token')

  },[token])

  return (
    <>
    <div>
      <Router>
      <div>
        {/* Header 1: Website Name and Logo */}
       

        {/* Main content */}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/business" element={<Business />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/ManualForm" element={<ManualForm />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/ReturnRefund" element={<ShippingPolicy />} />
          <Route path="/privacy-security" element={<PrivacySecurity />} />
          <Route path="/UserOrders" element={<UserOrders />} />
          <Route path="/UserDetails" element={<UserDetails />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/OrdersDashboard" element={<OrdersDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>


      </div>
    </Router>
    
    </div>
    {
      token ?
    <div className=""> 

    <ChatbotApp />
    </div>
    :
    <></>
    }
    </>
  );
}

export default App;
