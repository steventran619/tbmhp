import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface InputValue {
  email: string;
  password: string;
  username: string;
  adminPassword: string;
}

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
    username: "",
    adminPassword: "",
  });
  
  const { email, password, username, adminPassword } = inputValue;
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });
    
  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/admin/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
      adminPassword: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="adminPassword">Admin Password</label>
          <input
            type="password"
            name="adminPassword"
            value={adminPassword}
            placeholder="Enter the admin password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};