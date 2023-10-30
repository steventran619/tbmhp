import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './Admin.css';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    console.log(cookies);
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3000/admin",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      console.log(status);
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token", {}), navigate("/login"));
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token", {});
    navigate("/login");
  };

  return (
    <>
      <div className="admin_page">
        <h1>Admin Page</h1>
        <p>Welcome <span>{username}</span></p>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};