import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import classes from './Login.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (err: string) => {
    console.log(err);
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg: string) => {
    toast.success(msg, {
      position: "bottom-left",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/admin/login`,
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
        }, 1000);
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
    });
  };

  return (
    <div className={classes.form_container}>
      <h2>Login Account</h2>
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
        <button type="submit" className={classes.button}>Submit</button>
        <div className="signup-text">
          Need to sign up? <Link to={"/signup"} className="link">Signup</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};