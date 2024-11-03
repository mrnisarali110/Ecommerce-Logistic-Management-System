import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import LoginPopup from './LoginPopup';
import logisticsLogo from "../assets/image/logisticsLogo.png"; // Add your logo here
import UpdatePasswordModal from './UpdatePasswordModal';


const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Add Orders', path: '/UserOrders' },
  // { name: 'Admin Dashboard', path: '/AdminDashboard' },
  // { name: 'User Dashboard', path: '/userorders' },
  {name: 'Track Order', path: '/tracking'},
  { name: 'Business', path: '/business' },
  { name: 'Shipping Policy', path: '/ReturnRefund' },
  { name: 'Privacy Security', path: '/privacy-security' },
  { name: 'Contact Us', path: '/ContactUs' },
];

const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElOrders, setAnchorElOrders] = useState(null);
  const navigate = useNavigate();

  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'User',
    email: 'Email',
    role: 'Role'
  };
  // console.log('userr', user)
  // console.log(user); // Moved here to prevent reference error

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user info on logout
    navigate('/');
  };

  const handleOpenOrdersMenu = (event) => {
    setAnchorElOrders(event.currentTarget);
  };

  const handleCloseOrdersMenu = () => {
    setAnchorElOrders(null);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for managing the modal

  return (
    <>
    <header className="header-1">
    <div className="logo-container">
      <img src={logisticsLogo} alt="Logistics Logo" className="logo" />
      <h1 className="website-name">
        E-COMMERCE LOGISTICS MANAGEMENT SYSTEM
      </h1>
    </div>
  </header>
    <AppBar position="static" sx={{ backgroundColor: '#222020' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            {/* ELM SYSTEM */}
          </Typography> 

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {
              user.role !== "admin" || user.role !== "user" ?
                <>
                </>

                :
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {console.log('pg', pages)}
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
            }

          </Box>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
           <Typography 
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
            {/* {console.log('aaa', user.role !== "admin" )} */}
          {
            user.role === "Role" ?
              <>
              </>

              :
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => {
                  if (page.name === 'Add Orders') {
                    return (
                      <Box key={page.name}>
                        <Button
                          onMouseEnter={handleOpenOrdersMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {page.name}
                        </Button>
                        <Menu
                          id="menu-orders"
                          anchorEl={anchorElOrders}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          open={Boolean(anchorElOrders)}
                          onClose={handleCloseOrdersMenu}
                        >
                          <MenuItem onClick={handleCloseOrdersMenu} component={Link} to="/ManualForm">
                            Manual Form
                          </MenuItem>
                          <MenuItem onClick={handleCloseOrdersMenu} component={Link} to="/fileupload">
                            File Upload
                          </MenuItem>
                        </Menu>
                      </Box>
                    );
                  } else {
                    return (
                      <Button
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        component={Link}
                        to={page.path}
                      >
                        {page.name}
                      </Button>
                    );
                  }
                })}
              </Box>
          }


          {
            user.role === "Role" ?
              <>
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>

               <Button variant="link" onClick={() => setModalIsOpen(true)} className="button-link"
                 sx={{
                   backgroundColor: 'black',
                   color: 'white',
                   width: '70px',
                   padding:"5px",
                   '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
                >Login</Button>
               <Button variant="link" href="/signup" className="button-link"
               
               sx={{
                backgroundColor: 'black',
                color: 'white',
                width: '80px',
                padding:"5px",
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
               >Sign Up</Button>
                </Box>
              </>
              :
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name}>
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                    <MenuItem disabled>
                      <Typography textAlign="center" color="primary" fontWeight="bold">{user.name}</Typography>
                    </MenuItem>
                    <MenuItem disabled>
                      <Typography textAlign="center" color="primary">{user.email}</Typography>
                    </MenuItem>
                    <MenuItem disabled>
                      <Typography textAlign="center" color="primary">{user.role}</Typography>
                    </MenuItem>
                    <MenuItem >
                      <Typography textAlign="center" color="primary"><UpdatePasswordModal /></Typography>
                    </MenuItem>
                    {user?.role === "admin" ?
                      <MenuItem >
                        <Link to={'/AdminDashboard'} textAlign="center" color="primary" className='redirect'>Admin Dashboard</Link>
                      </MenuItem>
                      :
                      <MenuItem >
                        <Link to={'/userorders'} textAlign="center" color="primary" className='redirect'>User Dashboard</Link>
                      </MenuItem>

                    }

                    {console.log('lll', user)}
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                        sx={{ justifyContent: 'center' }} // Center the MenuItem content
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Box>
                </Menu>
              </Box>
          }

        </Toolbar>
      </Container>
      
      <LoginPopup modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </AppBar>
              </>

  );
}

export default ResponsiveAppBar;
