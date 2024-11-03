import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdatePasswordModal() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;

  const id = parsedUser ? parsedUser._id : null;

  // State to hold form data
  const [formData, setFormData] = React.useState({
    oldPassword: '',
    newPassword: '',
  });

  const [show, setShow] = React.useState(false);

  // Handlers for modal open/close
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Update password function
  const updatePassword = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/update-password/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        // Clear form after successful update
        setFormData({ oldPassword: '', newPassword: '' });
        handleClose(); // Close modal after update
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>Update Password</Button>

      <Modal show={show} onHide={handleClose} >
        {/* <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h3>Update Password</h3>
          <Form onSubmit={updatePassword}>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Old Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
