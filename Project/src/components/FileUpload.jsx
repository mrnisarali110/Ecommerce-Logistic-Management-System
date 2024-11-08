import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ResponsiveAppBar from './menubar';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [error, setError] = useState("");
  const [columnNames, setColumnNames] = useState([]);

  

  useEffect(() => {
    console.log("Parsed Data:", parsedData);
    console.log("Editable Data:", editableData);
  }, [parsedData, editableData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (Object.keys(editableData).length > 0) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave this page?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editableData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleParseFile = () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed Results:", results);
        const columns = results.meta.fields;
        const data = results.data;
        setParsedData(data);
        setColumnNames(columns);
        const initialSelectedColumns = columns.reduce(
          (acc, column) => ({ ...acc, [column]: true }),
          {}
        );
        setSelectedColumns(initialSelectedColumns);
        setShowPopup(true);
      },
      error: (err) => setError(`Parsing error: ${err.message}`),
    });
  };

  const handleColumnSelect = (columnName) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [columnName]: !prevSelectedColumns[columnName],
    }));
  };

console.log('parsedData',parsedData)
  const handleContinue = () => {
    if (parsedData.length === 0) {
      setError("No data available to process.");
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
      acc[orderNo].push({
        ...row,
        SerialNo: `ORD${getMaxSerialNo() + acc[orderNo].length + 1}`,
      });
      return acc;
    }, {});

    console.log("Editable Data after Continue:", editableData);
    setEditableData(editableData);
    setShowPopup(false);
  };

  const getMaxSerialNo = () => {
    let maxSerialNo = 0;
    Object.values(editableData).forEach((rows) => {
      rows.forEach((row) => {
        const serialNo = parseInt(row.SerialNo.replace("ORD", ""), 10);
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
        acc[column] = ""; // Initialize with empty values only for selected columns
      }
      return acc;
    }, {});
    setEditableData((prevEditableData) => ({
      ...prevEditableData,
      [newOrderNo]: [{ ...newEmptyRow, SerialNo: newOrderNo }], // Add an empty row with the new order number
    }));
  };


  
  function check(){
    return console.log('editabledataaaaa',selectedColumns,parsedData,columnNames,editableData)

  }
  let dataToSend =[]
  const handleGenerateLabel = async () => {
    console.log("Preparing to send data:", editableData);

    // Prepare the data to send to the server
     dataToSend = Object.values(editableData).flat();
    const token = localStorage.getItem("token"); // Get the token from local storage

    if (!token) {
      alert("You must be logged in to generate labels.");
      return;
    }

    console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan')
    try {
      // First, save the orders in the backend
      const saveOrdersResponse = await fetch(
        "http://localhost:3001/auth/save-orders",
        {
          // Updated path
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
          body: JSON.stringify({ orders: dataToSend }), // Send the orders in the request body
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
          body: JSON.stringify(dataToSend), // Send the same data for label generation
        }
      );

      if (!generateLabelsResponse.ok) {
        throw new Error("Failed to generate labels");
      }
      
      setEditableData({});
      setSelectedColumns({});
      setParsedData([]);
      setShowPopup(false);
      window.location.reload();
      // Assuming the server responds with a single PDF URL
      const { url } = await generateLabelsResponse.json();
      
      // Open the PDF in a new tab
      window.open(url, "_blank");
      
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save orders or generate labels. Please try again.");
    }
  };


  return (
    <div>
       <div className="appbar-container">
        <ResponsiveAppBar />
      </div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleParseFile}>Upload File</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showPopup && (
        <div className="popup">
          <h2>Select columns to display</h2>
          <ul>
  {console.log('setSelectedColumns',selectedColumns)}

            {Object.keys(selectedColumns).map((columnName) => (
              <li key={columnName}>
                <input
                  type="checkbox"
                  checked={selectedColumns[columnName]}
                  onChange={() => handleColumnSelect(columnName)}
                />
                <span>{columnName}</span>
              </li>
            ))}
          </ul>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}
      {Object.keys(editableData).length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                {Object.keys(selectedColumns).map(
                  (columnName) =>
                    columnName !== "SerialNo" &&
                    selectedColumns[columnName] && (
                      <th key={columnName}>{columnName}</th>
                    )
                )}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(editableData).map((orderNo) =>
                editableData[orderNo].map((row, rowIndex) => (
                  <tr key={`${orderNo}-${rowIndex}`}>
                    <td>{row.SerialNo}</td>
                    {console.log('columnName',Object.keys(selectedColumns) )}
                    {Object.keys(selectedColumns).map(
                      (columnName) =>
                        columnName !== "SerialNo" &&
                        selectedColumns[columnName] && (
                          <td key={columnName}>
                            <input
                              type="text"
                              value={row[columnName]}
                              onChange={(e) =>
                                handleCellChange(
                                  orderNo,
                                  rowIndex,
                                  columnName,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        )
                    )}
                    <td>
                      <button
                        onClick={() => handleDeleteRow(orderNo, rowIndex)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button onClick={handleAddNewOrder}>Add New Order</button>
          <button onClick={handleGenerateLabel}>Save Orders & Generate Labels</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
