import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  update: () => {},
  refresh: () => {},
});

export default UserContext;
