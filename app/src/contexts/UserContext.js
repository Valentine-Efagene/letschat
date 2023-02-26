import { createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
  update: () => {},
});

export default UserContext;
