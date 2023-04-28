import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// https://stackoverflow.com/a/69592617/6132438

const AuthRoute = ({
  token,
  children,
}: {
  token: string | undefined | null | string;
  children: ReactElement;
}) => {
  return token == null ? <Outlet /> : <Navigate to="/profile" />;
};

export default AuthRoute;
