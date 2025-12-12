import React, { useState } from "react";

import "./Register.css";

import { register } from '../../services/api';

export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("name", e.target.name);
    console.log("value", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log("formData", formData)
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        await register(formData)
        alert("User registed successfully");

    }catch(err){
        console.log("err", err)
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-control">
          <label>Username</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <input type="submit" value="Register" className="btn btn-block" />

        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="email"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
