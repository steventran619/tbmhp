import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import classes from './NewsletterUnsubscribe.module.css';

const NewsletterUnsubscribe = (): React.ReactElement => {
  const [newsletterValue, setNewsletterValue] = useState<{
    email: string;
  }>({
    email: "",
  })
  const { email } = newsletterValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterValue((prev) => ({
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
        `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter/unsubscribe`,
        {
          ...newsletterValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred while submitting the form. Please try again.");
      console.log(error);
    }
    setNewsletterValue({
      ...newsletterValue,
      email: "",
    });
  };
  return (
    <div className={classes.form_container}>
      <h2>Unsubscribe</h2>
      <p className={classes.description}>Please enter your email to unsubscribe</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className={classes.input}
            value={email}
            required
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className={classes.button}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewsletterUnsubscribe;