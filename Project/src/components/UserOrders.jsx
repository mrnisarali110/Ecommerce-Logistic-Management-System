import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './menubar';
import './UserOrders.css';  // Assuming you have a CSS file for styling
import Footer from './Footer';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredOrders, setFilteredOrders] = useState([]); // New state for filtered orders


  const getTimelyOrder = async (time) =>{
    try {

      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3001/auth/get-sorted-order?timeframe=${time}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response,'eeeeeeeeeeeeeeeeeeeeeeeeee')
      if(response.data.success){
        setOrders(response.data.orders)
        return
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }


  // Function to fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
      setError('You must be logged in to view orders.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/get-orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders); // Assuming backend sends back orders as 'orders'
      console.log(data);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Automatically fetch orders when the component mounts (on page load)
  useEffect(() => {
    fetchOrders();
  }, []);  // The empty dependency array makes sure this runs only once when the component mounts

  useEffect(() => {
    // Filtered orders based on search term
    const filtered = orders.filter(order =>
      order.orderData.RecieverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderData.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOrders(filtered); // Update the filtered orders state

    // Calculate total amount for filtered orders
    const total = filtered.reduce((acc, order) => {
      const amount = parseFloat(order.orderData["Amount"]); // Convert amount to number
      return acc + (isNaN(amount) ? 0 : amount); // Only add if amount is a valid number
    }, 0);

    setTotalAmount(total);
  }, [orders, searchTerm]);

  return (
    <div>
      <div className="appbar-container">
        <ResponsiveAppBar />
      </div>
      <div className="container my-5">
        <h1>Orders Details</h1>
        
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Search bar for filtering orders */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Receiver Name or Serial No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="time">

          <Button  value={"today"}  onClick={()=>getTimelyOrder("today")}>Today</Button>
          <Button value = {"week"}   onClick={()=>getTimelyOrder("week")}>Last Week Orders</Button>
          <Button value = {"month"}   onClick={()=>getTimelyOrder("month")}>Last Month Order</Button>
          </div>
        <h3>Total Amount: {totalAmount.toFixed(2)}</h3> 

        {filteredOrders?.length > 0 ? (
          <div className="orders-container">
            {filteredOrders.map((order, index) => (
              <div className="order-card" key={index}>
                <h3>Order {index + 1}</h3>
                <p><strong>Receiver Name:</strong> {order.orderData.RecieverName}</p>
                <p><strong>Serial No:</strong> {order.orderData.SerialNo}</p>
                <p><strong>Receiver Number:</strong> {order.orderData.ReceiverNumber}</p>
                <p><strong>Receiver Address:</strong> {order.orderData.RecieverAddress}</p>
                <p><strong>Shipper Details:</strong> {order.orderData.ShipperDetails}</p>
                <p><strong>City:</strong> {order.orderData.City}</p>
                <p><strong>Weight:</strong> {order.orderData.Weight}</p>
                <p><strong>Amount:</strong> {order.orderData.Amount}</p>
                <p><strong>Pieces:</strong> {order.orderData.pieces}</p>
                <p><strong>Product Details:</strong> {order.orderData['ProductDetails']}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No orders found</p>
        )}
      </div>
      <div >
        <Footer />
      </div>
    </div>
  );
};

export default UserOrders;
