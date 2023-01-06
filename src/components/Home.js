import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) navigate("/timeline");
    else navigate("/sign-in");
  }, [navigate, user]);

  return (<></>);
}