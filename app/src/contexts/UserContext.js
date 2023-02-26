import { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
  login: () => {},
});

export default UserContext;
