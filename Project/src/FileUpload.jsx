import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ResponsiveAppBar from './components/menubar';

import { Button, TextField, Box, Typography, Grid, Card, CardContent, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import Footer from './components/Footer';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [error, setError] = useState('');
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    console.log('Parsed Dataaaaaaaaaaaaaaa:', parsedData);
    console.log('Editable Data:', editableData);
  }, [parsedData, editableData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (Object.keys(editableData).length > 0) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave this page?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [editableData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid CSV file.');
    }
  };

  const handleParseFile = () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Parsed Results:', results);
        const columns = results.meta.fields;
        const data = results.data;
        setParsedData(data);
        setColumnNames(columns);
        const initialSelectedColumns = columns.reduce((acc, column) => ({ ...acc, [column]: true }), {});
        setSelectedColumns(initialSelectedColumns);
        setShowPopup(true);
      },
      error: (err) => setError(`Parsing error: ${err.message}`)
    });
  };

  const handleColumnSelect = (columnName) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [columnName]: !prevSelectedColumns[columnName]
    }));
  };

  const handleContinue = () => {
    if (parsedData.length === 0) {
      setError('No data available to process.');
      return;
    }

    const filteredData = parsedData.map((row) => {
      const newRow = {};
      Object.keys(row).forEach((columnName) => {
        if (selectedColumns[columnName]) {
          newRow[columnName] = row[columnName];
        }
      });
      return newRow;
    });

    const editableData = filteredData.reduce((acc, row) => {
      const orderNo = row.OrderNo || `ORD${getMaxSerialNo() + 1}`;
      if (!acc[orderNo]) {
        acc[orderNo] = [];
      }
      acc[orderNo].push({ ...row, SerialNo: `ORD${getMaxSerialNo() + acc[orderNo].length + 1}` });
      return acc;
    }, {});
    console.log('Editable Data after Continue:', editableData);
    setEditableData(editableData);
    setShowPopup(false);
  };

  const getMaxSerialNo = () => {
    let maxSerialNo = 0;
    Object.values(editableData).forEach((rows) => {
      rows.forEach((row) => {
        const serialNo = parseInt(row.SerialNo.replace('ORD', ''), 10);
        if (serialNo > maxSerialNo) {
          maxSerialNo = serialNo;
        }
      });
    });
    return maxSerialNo;
  };

  const handleCellChange = (orderNo, rowIndex, columnName, newValue) => {
    setEditableData((prevEditableData) => {
      const newRow = { ...prevEditableData[orderNo][rowIndex] };
      newRow[columnName] = newValue;
      prevEditableData[orderNo][rowIndex] = newRow;
      return { ...prevEditableData };
    });
  };

  const handleDeleteRow = (orderNo, rowIndex) => {
    setEditableData((prevEditableData) => {
      const newData = { ...prevEditableData };
      newData[orderNo].splice(rowIndex, 1);
      if (newData[orderNo].length === 0) {
        delete newData[orderNo];
      }
      return newData;
    });
  };

  const handleAddNewOrder = () => {
    const newOrderNo = `ORD${getMaxSerialNo() + 1}`;
    const newEmptyRow = Object.keys(selectedColumns).reduce((acc, column) => {
      if (selectedColumns[column]) {
        acc[column] = ''; // Initialize with empty values only for selected columns
      }
      return acc;
    }, {});
    setEditableData((prevEditableData) => ({
      ...prevEditableData,
      [newOrderNo]: [{ ...newEmptyRow, SerialNo: newOrderNo }]  // Add an empty row with the new order number
    }));
  };

  let dataToSend = [];

  const handleGenerateLabel = async () => {
    console.log("Preparing to send data:", editableData);

    // Prepare the data to send to the server
    dataToSend = Object.values(editableData).flat();

    // Remove the last element from the array
    const filteredData = dataToSend.slice(0, -1);

    console.log('dataToSend', dataToSend);
    console.log('filteredData', filteredData);

    // Check for missing keys/values
    for (const item of filteredData) {
      for (const [key, value] of Object.entries(item)) {
        if (value === undefined || value === null || value === '') {
          alert(`Missing field: ${key} in the object: `);
          return; // Stop further execution if any key is missing
        }
      }
    }

    const token = localStorage.getItem("token"); // Get the token from local storage

    if (!token) {
      alert("You must be logged in to generate labels.");
      return;
    }

    console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan');

    try {
      // First, save the orders in the backend
      const saveOrdersResponse = await fetch(
        "http://localhost:3001/auth/save-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
          body: JSON.stringify({ orders: filteredData }), // Send the orders in the request body
        }
      );

      if (!saveOrdersResponse.ok) {
        throw new Error("Failed to save orders");
      }

      console.log("Orders saved successfully");

      // Now proceed to generate the labels
      const generateLabelsResponse = await fetch(
        "http://localhost:3001/generate-labels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
          body: JSON.stringify(filteredData), // Send the same data for label generation
        }
      );

      if (!generateLabelsResponse.ok) {
        throw new Error("Failed to generate labels");
      }

      // Assuming the server responds with a single PDF URL
      const { url } = await generateLabelsResponse.json();

      // Open the PDF in a new tab
      window.open(url, "_blank");

      setEditableData({});
      setSelectedColumns({});
      setParsedData([]);
      setShowPopup(false);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save orders or generate labels. Please try again.");
    }
  };


  //   const handleGenerateLabel = async () => {
  //     console.log('Preparing to send data:', editableData);

  //     // Prepare the data to send to the server
  //     const dataToSend = Object.values(editableData).flat();
  //     console.log('dataToSend',dataToSend)
  //     const filteredData = dataToSend.pop();
  //     console.log('dataToSend',dataToSend)
  //     if (dataToSend) {
  //         for (const [key, value] of Object.entries(dataToSend)) {
  //             if (value === undefined || value === null || value === '') {
  //                 alert(`Missing field: ${key} in the object: `);
  //                 return; // Stop further execution
  //             }
  //         }
  //     }

  //     const token = localStorage.getItem('token'); // Get the token from local storage

  //     if (!token) {
  //         alert('You must be logged in to generate labels.');
  //         return;
  //     }

  //     try {
  //         // First, save the orders in the backend
  //         const saveOrdersResponse = await fetch('http://localhost:3001/auth/save-orders', { // Updated path
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${token}`, // Include token in the request header
  //             },
  //             body: JSON.stringify({ orders: dataToSend }), // Send the orders in the request body
  //         });

  //         if (!saveOrdersResponse.ok) {
  //             throw new Error('Failed to save orders');
  //         }

  //         console.log('Orders saved successfully');

  //         // Now proceed to generate the labels
  //         const generateLabelsResponse = await fetch('http://localhost:3001/generate-labels', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${token}`, // Include token in the request header
  //             },
  //             body: JSON.stringify(dataToSend), // Send the same data for label generation
  //         });

  //         if (!generateLabelsResponse.ok) {
  //             throw new Error('Failed to generate labels');
  //         }

  //         // Assuming the server responds with a single PDF URL
  //         const { url } = await generateLabelsResponse.json();

  //         // Open the PDF in a new tab
  //         window.open(url, '_blank');
  //     } catch (error) {
  //         console.error('Error:', error);
  //         alert('Failed to save orders or generate labels. Please try again.');
  //     }
  // };

  return (
    <>
      <div className="appbar-container">
        <ResponsiveAppBar />
      </div>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Upload Your CSV File</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                type="file"
                fullWidth
                inputProps={{ accept: ".csv" }}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleParseFile}
              >
                Upload File
              </Button>
            </Grid>
          </Grid>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {showPopup && (
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
              <DialogTitle>Select columns to display</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  {Object.keys(selectedColumns).map((columnName) => (
                    <Grid item xs={6} sm={4} key={columnName}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedColumns[columnName]}
                            onChange={() => handleColumnSelect(columnName)}
                          />
                        }
                        label={columnName}
                      />
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleContinue} color="primary" variant="contained">Continue</Button>
              </DialogActions>
            </Dialog>
          )}
          {Object.keys(editableData).length > 0 && (
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h6">Editable Data</Typography>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Serial No.</TableCell>
                        {Object.keys(selectedColumns).map((columnName) => (
                          columnName !== 'SerialNo' && selectedColumns[columnName] && (
                            <TableCell key={columnName}>{columnName}</TableCell>
                          )
                        ))}
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(editableData).map((orderNo) => (
                        editableData[orderNo].map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            <TableCell>{row.SerialNo}</TableCell>
                            {Object.keys(selectedColumns).map((columnName) => (
                              columnName !== 'SerialNo' && selectedColumns[columnName] && (
                                <TableCell key={columnName}>
                                  <TextField
                                    value={row[columnName] || ''}
                                    onChange={(e) => handleCellChange(orderNo, rowIndex, columnName, e.target.value)}
                                    fullWidth
                                  />
                                </TableCell>
                              )
                            ))}
                            <TableCell>
                              <Button
                                color="secondary"
                                onClick={() => handleDeleteRow(orderNo, rowIndex)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Button onClick={handleAddNewOrder} color="primary" variant="outlined">
                    Add New Order
                  </Button>
                  <Button onClick={handleGenerateLabel} color="primary" variant="contained" sx={{ ml: 2 }}  className='my-0'>
                    Generate Labels
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
      <div className="mb-0 foot">
        <Footer></Footer>
      </div>
    </>
  );
};

export default FileUpload;
