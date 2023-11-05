import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const Admin: FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
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
          "http://localhost:3000/admin",
          {},
          { withCredentials: true }
        );
        if (data.status && data.user) {
          setUsername(data.user);
          toast(`Hello ${data.user}`, {
            position: "top-right",
          });
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

  const Logout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  // Render a loading state or null while checking the cookie
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="admin_page">
        <h4>Welcome <span>{username}</span></h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;
