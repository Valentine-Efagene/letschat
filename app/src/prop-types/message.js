import { arrayOf, shape, string } from 'prop-types';

const message = shape({
  sender: string,
  receiver: string,
  ref: string,
  photos: arrayOf(string),
});

const messages = arrayOf({ message });

export { message as messageProp, messages as messagesProp };
