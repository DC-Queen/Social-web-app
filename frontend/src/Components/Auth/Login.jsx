import React from "react";

import { login } from ".../../services/api";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login(formData);
      console.log("data",data.token)
      localStorage.setItem('token',data.token)
      alert("User logged in successfully");

    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}
