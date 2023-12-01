import { useEffect, useState, FC } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import { AdminNav } from '../../components/AdminNav/AdminNav';
import AdminHome from '../../components/AdminHome/AdminHome';
import AdminNewsletter from '../../components/AdminNewsletter/AdminNewsletter';
import { ToastContainer } from "react-toastify";
import classes from './Admin.module.css';

export const Admin: FC = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['token']);
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/admin`,
          {},
          { withCredentials: true }
        );
        if (data.status && data.user) {
          setUsername(data.user);
        } else {
          removeCookie("token", { path: "/" });
          navigate("/login");
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeCookie("token", { path: "/" });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);



  // Render a loading state or null while checking the cookie
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className={classes.admin_container}>
      <AdminNav />
      <div className={classes.admin_page}>
        <Routes>
          <Route path="" element={<AdminHome username={username}/>}/>
          <Route path="/newsletter" element={<AdminNewsletter />}/>
        </Routes>
      </div>
      
    </div>
    <ToastContainer />
    </>
  );
};

export default Admin;
