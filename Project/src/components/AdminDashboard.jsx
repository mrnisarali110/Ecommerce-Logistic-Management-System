import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure you have installed 'jwt-decode' package
import './AdminDashboard.css'; // Updated CSS file
import ResponsiveAppBar from './menubar';
import Footer from './Footer';
import { Button, Container, Dropdown } from 'react-bootstrap';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0)
  // const [status,setStatus] = useState("")



  const getTimelyOrder = async (time) =>{
    try {

      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:3001/auth/get-sorted-order?timeframe=${time}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.success){
        setOrders(response.data.orders)
        return
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }




  // update order status 

  const updateOrderStatus = async (id,status)=>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3001/auth/update-order-status/${id}`,{Order_status:status}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      })
      console.log('ressssss',response)
      if(response.data.success){
        alert(response.data.message)

      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      // Fetch all users
      axios.get('http://localhost:3001/auth/get-all-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data && Array.isArray(response.data.users)) {
            setUsers(response.data.users);
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });

      // Fetch all orders for admin
      if (userRole === 'admin') {
        axios.get('http://localhost:3001/auth/get-all-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.data && Array.isArray(response.data.orders)) {
              setOrders(response.data.orders);
            }
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
      }
    }
  }, []);

  // Handle toggle order status and update backend
  const handleToggleOrderStatus = (orderId, isActive) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3001/auth/update-order-status/${orderId}`,
      { isActive: !isActive },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, isActive: !isActive } : order
        ));
      })
      .catch((error) => {
        console.error('Error updating order status:', error.response ? error.response.data : error);
      });
  };

  // Handle toggle user status and update backend
  const handleToggleUserStatus = (userId, isActive) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:3001/auth/update-user-status/${userId}`,
      { isActive: !isActive },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUsers(users.map(user =>
          user._id === userId ? { ...user, isActive: !isActive } : user
        ));
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
      });
  };

  const renderOrderDetails = (orderData) => (
    <div className="order-details">
      <p><strong>Receiver Name:</strong> {orderData["RecieverName"]}</p>
      <p><strong>Receiver Number:</strong> {orderData["RecieverNumber"]}</p>
      <p><strong>Receiver Address:</strong> {orderData["RecieverAddress"]}</p>
      <p><strong>Shipper Details:</strong> {orderData["ShipperDetails"]}</p>
    </div>
  );

  // Filtered orders based on search term
  const filteredOrders = orders.filter(order =>
    order.orderData["RecieverName"]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  useEffect(() => {
    // Calculate total amount whenever orders or search term changes
    const filteredOrders = orders.filter(order =>
      order.orderData["RecieverName"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||  order.orderData.SerialNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const total = filteredOrders.reduce((acc, order) => {
      const amount = parseFloat(order.orderData["Amount"]); // Convert amount to number
      return acc + (isNaN(amount) ? 0 : amount); // Only add if amount is a valid number
    }, 0);

    setTotalAmount(total);
  }, [orders, searchTerm]);

  return (
    <div className="admin-dashboard-modern">
      <div className="appbar-container">
        <ResponsiveAppBar />
      </div>
      <br />
      <div className="dashboard-controls">
        <button onClick={() => { setShowUsers(true); setShowOrders(false); }} className="control-btn">
          Show All Users
        </button>
        <button onClick={() => { setShowOrders(true); setShowUsers(false); }} className="control-btn">
          Show All Orders
        </button>
      </div>
    <Container>
      {showOrders && (
        <div className="order-section">
          <h2 className="section-title text-center">Orders</h2>
          <br />
          {/* Search bar for filtering orders */}
          <div className="search-container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
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

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Receiver Name</th>
                <th scope="col">Receiver Number</th>
                <th scope="col">ShipperDetails</th>
                <th scope="col">City</th>
                <th scope="col">Weight</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Update Order Status</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order,i) => (
                <tr key={order._id}>
                  <th scope="row">{1+i}</th>
                  <td>{order.orderData["RecieverName"]}</td>
                  <td>{order.orderData["ReceiverNumber"]}</td>
                  <td>{order.orderData["ShipperDetails"]}</td>
                  <td>{order.orderData["City"]}</td>
                  <td>{order.orderData["Weight"]}</td>
                  <td>{order.orderData["Amount"]}</td>
                  <td>{order.Order_status} </td>
                  <td> 
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <i class="bi bi-grip-vertical"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                      <Dropdown.Item value={"processing"}   onClick={()=>updateOrderStatus(order._id,"processing")}>processing</Dropdown.Item>
                      <Dropdown.Item value={"complete"}  onClick={()=>updateOrderStatus(order._id,"complete")} >complete</Dropdown.Item>
                      <Dropdown.Item value={"incomplete"}   onClick={()=>updateOrderStatus(order._id,"incomplete")}>incomplete</Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  </td>
                  {/* <td>
                    <button onClick={() => handleToggleOrderStatus(order._id, order.isActive)}>
                      {order.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td> */}
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      )}

      {showUsers && (
        
        <div className="user-section">
          <h2 className="section-title text-center">Users</h2>
          <br />
          {/* Search bar for filtering users */}
          <div className="search-container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user,i) => (
                <tr key={i}>
                  <th scope="row">{1+i}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => handleToggleUserStatus(user._id, user.isActive)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

</Container>
    </div>
  );
};

export default AdminDashboard;

















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Make sure you have installed 'jwt-decode' package
// import './AdminDashboard.css'; // Updated CSS file
// import ResponsiveAppBar from './menubar';
// import Footer from './Footer';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [showUsers, setShowUsers] = useState(false);
//   const [showOrders, setShowOrders] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const userRole = decodedToken.role;

//       // Fetch all users
//       axios.get('http://localhost:3001/auth/get-all-users', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           if (response.data && Array.isArray(response.data.users)) {
//             setUsers(response.data.users);
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching users:', error);
//         });

//       // Fetch all orders for admin
//       if (userRole === 'admin') {
//         axios.get('http://localhost:3001/auth/get-all-orders', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//           .then((response) => {
//             if (response.data && Array.isArray(response.data.orders)) {
//               setOrders(response.data.orders);
//             }
//           })
//           .catch((error) => {
//             console.error('Error fetching orders:', error);
//           });
//       }
//     }
//   }, []);

//   // Handle toggle order status and update backend
//   const handleToggleOrderStatus = (orderId, isActive) => {
//     const token = localStorage.getItem('token');
//     axios.put(`http://localhost:3001/auth/update-order-status/${orderId}`,
//       { isActive: !isActive },
//       { headers: { Authorization: `Bearer ${token}` } })
//       .then(() => {
//         setOrders(orders.map(order =>
//           order._id === orderId ? { ...order, isActive: !isActive } : order
//         ));
//       })
//       .catch((error) => {
//         console.error('Error updating order status:', error.response ? error.response.data : error);
//       });
//   };

//   // Handle toggle user status and update backend
//   const handleToggleUserStatus = (userId, isActive) => {
//     const token = localStorage.getItem('token');
//     axios.put(`http://localhost:3001/auth/update-user-status/${userId}`,
//       { isActive: !isActive },
//       { headers: { Authorization: `Bearer ${token}` } })
//       .then(() => {
//         setUsers(users.map(user =>
//           user._id === userId ? { ...user, isActive: !isActive } : user
//         ));
//       })
//       .catch((error) => {
//         console.error('Error updating user status:', error);
//       });
//   };

//   const renderOrderDetails = (orderData) => (
//     <div className="order-details">
//       <p><strong>Receiver Name:</strong> {orderData["RecieverName"]}</p>
//       <p><strong>Receiver Number:</strong> {orderData["RecieverNumber"]}</p>
//       <p><strong>Receiver Address:</strong> {orderData["RecieverAddress"]}</p>
//       <p><strong>Shipper Details:</strong> {orderData["ShipperDetails"]}</p>
//     </div>
//   );

//   // Filtered orders based on search term
//   const filteredOrders = orders.filter(order =>
//     order.orderData["RecieverName"]?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Filtered users based on search term
//   const filteredUsers = users.filter(user =>
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );



//   return (
//     <div className="admin-dashboard-modern">
//       <div className="appbar-container">
//         <ResponsiveAppBar />
//       </div>
//       <br />
//       <div className="dashboard-controls">
//         <button onClick={() => { setShowUsers(true); setShowOrders(false); }} className="control-btn">
//           Show All Users
//         </button>
//         <button onClick={() => { setShowOrders(true); setShowUsers(false); }} className="control-btn">
//           Show All Orders
//         </button>
//       </div>

//       {showOrders && (
//         <div className="order-section">
//           <h2 className="section-title text-center">Orders</h2>
//           <br />
//           {/* Search bar for filtering orders */}
//           <div className="search-container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
//             <input
//               type="text"
//               placeholder="Search by Receiver Name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-bar"
//             />
//           </div>

//           <div className="order-list">
//             {filteredOrders.map((order) => (
//               <div className="order-item" key={order._id}>
//                 <div className="order-header">
//                   <h6 className="order-id">Order ID: {order._id}</h6>
//                 </div>
//                 {renderOrderDetails(order.orderData)}
//                 <div className="status-toggle">
//                   {/* <label className="switch">
//                     <input 
//                       type="checkbox" 
//                       checked={!!order.isActive} 
//                       onChange={() => handleToggleOrderStatus(order._id, order.isActive)} 
//                     />
//                     <span className="slider round"></span>
//                   </label> */}
//                 </div>
//               </div>
//             ))}
//             <table class="table">
//               <thead>
//                 <tr>
//                   <th scope="col">Order ID:</th>
//                   <th scope="col">First</th>
//                   <th scope="col">Last</th>
//                   <th scope="col">Handle</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row">1</th>
//                   <td>Mark</td>
//                   <td>Otto</td>
//                   <td>@mdo</td>
//                 </tr>
               
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showUsers && (
//         <div className="user-section">
//           <h2 className="section-title text-center">Users</h2>
//           <br />
//           {/* Search bar for filtering users */}
//           <div className="search-container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
//             <input
//               type="text"
//               placeholder="Search by Name or Email"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-bar"
//             />
//           </div>
//           <div className="user-list">
//             {filteredUsers.map((user) => (
//               <div className="user-item" key={user._id}>
//                 <h6 className="user-name">Name: {user.name}</h6>
//                 <p className="user-email">Email: {user.email}</p>
//                 <p className="user-role">Role: {user.role}</p>
//                 <div className="status-toggle">
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       checked={user.isActive}
//                       onChange={() => handleToggleUserStatus(user._id, user.isActive)}
//                     />
//                     <span className="slider round"></span>
//                   </label>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;













