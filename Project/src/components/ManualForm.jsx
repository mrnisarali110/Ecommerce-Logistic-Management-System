import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, TextField, Button, Box, Modal, Typography } from "@mui/material";
import ResponsiveAppBar from './menubar';

const ManualForm = () => {
  const [formData, setFormData] = useState({
    ReceiverName: '',
    ReceiverNumber: '',
    ReceiverAddress: '',
    ShipperDetails: '',
    City: '',
    Weight: '',
    Amount: '',
    Pieces: '',
    ProductDetails: '',
    SerialNo: '',
  });

  const [open, setOpen] = useState(false);
  const [labelData, setLabelData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const token = localStorage.getItem('token'); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage('Authentication token is missing. Please log in again.');
      setOpen(true);
      return;
    }

    const orderData = [formData]; 

    try {
      const saveOrdersResponse = await fetch(
        "http://localhost:3001/auth/save-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orders: orderData }),
        }
      );

      if (!saveOrdersResponse.ok) {
        throw new Error('Failed to save orders');
      }

      const generateLabelsResponse = await fetch(
        "http://localhost:3001/generate-labels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!generateLabelsResponse.ok) {
        throw new Error('Failed to generate labels');
      }

      const { url } = await generateLabelsResponse.json();
      window.open(url, "_blank");
      setLabelData(`Order for ${formData.ReceiverName} - ${formData.ProductDetails} generated successfully!`);
      setErrorMessage('');
      setOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
  };

  return (
    <>
      <div className="appbar-container">
        <ResponsiveAppBar />
      </div>
      <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Receiver Details</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receiver Name"
                variant="outlined"
                name="ReceiverName"
                value={formData.ReceiverName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receiver Number"
                variant="outlined"
                name="ReceiverNumber"
                value={formData.ReceiverNumber}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Receiver Address"
                variant="outlined"
                name="ReceiverAddress"
                value={formData.ReceiverAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Shipper Details"
                variant="outlined"
                name="ShipperDetails"
                value={formData.ShipperDetails}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="City"
                value={formData.City}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight"
                variant="outlined"
                name="Weight"
                value={formData.Weight}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                name="Amount"
                value={formData.Amount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pieces"
                variant="outlined"
                name="Pieces"
                value={formData.Pieces}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Details"
                variant="outlined"
                name="ProductDetails"
                value={formData.ProductDetails}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Serial Number"
                variant="outlined"
                name="SerialNo"
                value={formData.SerialNo}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit Order
          </Button>
        </form>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6">{labelData || errorMessage}</Typography>
            <Button onClick={handleClose} color="primary">Close</Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ManualForm;
