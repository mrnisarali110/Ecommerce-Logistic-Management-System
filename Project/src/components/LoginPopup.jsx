import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { json, Link, useNavigate } from "react-router-dom"; // Import useNavigate

Modal.setAppElement("#root"); // This is important to bind modal to your root element

function LoginPopup({ modalIsOpen, setModalIsOpen }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(""); // For showing login status (errors, success, etc.)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Perform login
      axios
        .post("http://localhost:3001/auth/login", formData)
        .then((response) => {
          console.log('erer',response)
          if(response.data.user.isActive === false){
            return Alert("Admin Has Blocked you")
          }
          if (response.status === 200) {
            const token = response.data.token; // Assuming you're getting a token
            localStorage.setItem("token", token);
            const user = response.data.user; // Save token in localStorage
            localStorage.setItem("user", JSON.stringify(user));
            setLoginStatus("Login Successful!");
            alert("Login Successful!..");
            navigate("/home"); // Redirect to home
          } else {
            setLoginStatus("Unexpected response from the server.");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              setLoginStatus("Login Failed: User not found.");
            } else if (error.response.status === 401) {
              setLoginStatus("Login Failed: Incorrect password.");
            } else {
              setLoginStatus(`Login Failed: ${error.response.data.message}`);
            }
          } else {
            setLoginStatus(
              "Login Failed: No response from the server. Please try again later."
            );
          }
        });
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        error = "Invalid email address";
      }
    } else if (name === "password") {
      if (value.length < 8) {
        error = "Password must be at least 8 characters";
      }
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        setErrors({
          ...errors,
          [key]: "This field is required",
        });
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)} // You can disable this if you don't want the modal to be closed
      contentLabel="Login Modal"
      shouldCloseOnOverlayClick={true} // Prevent closing the modal by clicking outside
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          padding: "20px",
        },
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{width:"500px"}}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>

        <Link to={'/signup'}>Register Now</Link>
        {loginStatus && (
          <div
            style={{ color: loginStatus.includes("Failed") ? "red" : "green" }}
          >
            {loginStatus}
          </div>
        )}
      </form>
    </Modal>
  );
}

export default LoginPopup;
