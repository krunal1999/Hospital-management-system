import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  useEffect(() => {
    toast("welcome to login page");
  }, []);

  return <div>LoginPage</div>;
}

export default LoginPage;
