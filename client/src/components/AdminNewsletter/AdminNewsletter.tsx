import React from 'react';
import axios from "axios";
import {  toast } from "react-toastify";
import { NewsletterSubscriber } from '../../types';

const AdminHome = (): React.ReactElement => {

  const copySubscribersToClipboard = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/newsletter/subscribers`, {
        params: {
          isActive: true
        }
      });
    const emails = (data as NewsletterSubscriber[]).map(subscriber => subscriber.email).join(', ');
    navigator.clipboard.writeText(emails);
    toast.success("Emails copied to clipboard", {
      position: "bottom-left",
    });
  }
  return (
    <>
      <h4>Newsletter Admin Settings</h4>
      <button onClick={copySubscribersToClipboard}>Copy To Clipboard</button>
    </>
    
  );
};

export default AdminHome;