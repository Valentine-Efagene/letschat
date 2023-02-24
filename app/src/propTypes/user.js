import { arrayOf, string } from 'prop-types';

const user = {
  avatar: string,
  firstName: string,
  lastName: string,
  email: string,
};

const users = arrayOf({
  avatar: string,
  firstName: string,
  lastName: string,
  email: string,
});

export { user as UserProp, users as usersProp };
