import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import classes from './Signup.module.css';
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/admin/signup`,
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
    <div className={classes.form_container}>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className={classes.input}
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className={classes.input}
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
            className={classes.input}
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
            className={classes.input}
            value={adminPassword}
            placeholder="Enter the admin password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className={classes.button}>Submit</button>
        <div className={classes.signup_text}>
          Already have an account? <Link to={"/login"} className={classes.link}>Login</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};