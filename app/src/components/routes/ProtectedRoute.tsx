import { ReactElement } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// https://stackoverflow.com/a/69592617/6132438

const ProtectedRoute = ({
  token,
  children,
}: {
  token: undefined | null | string;
  children: ReactElement;
}) => {
  return token == null ? <Navigate to="/auth/login" /> : children;
};

export default ProtectedRoute;
