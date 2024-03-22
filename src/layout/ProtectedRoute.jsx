import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProtectedRoute({ allowedRoles }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (storedUser.role !== null && storedStatus) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [storedUser, storedStatus]);

  const isRoleAllowed = storedUser
    ? allowedRoles.includes(storedUser.role)
    : false;

  // console.log(allowedRoles.includes(storedUser.role));
  // console.log(isAuthenticated);
  // console.log(isRoleAllowed);

  if (!isRoleAllowed) {
    toast.error("Not Authorised");
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
