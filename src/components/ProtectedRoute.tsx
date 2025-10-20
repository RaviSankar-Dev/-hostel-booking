import { useEffect, useState } from "react";
import type { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: ReactNode;
  type: "student" | "admin";
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, type }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const student = localStorage.getItem("currentUser");
      const admin = localStorage.getItem("currentAdmin");

      if (type === "student" && student) setIsAllowed(true);
      if (type === "admin" && admin === "admin@pg.com") setIsAllowed(true);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [type]);

  if (loading) return <Loader />;

  if (!isAllowed) {
    return <Navigate to={type === "admin" ? "/admin-login" : "/auth"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
