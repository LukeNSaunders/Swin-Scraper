import DOMPurify from 'dompurify';
import { UserProps } from '../types/user';

export const sanitize = (input: UserProps) => {
  const sanitisedUser = {
    username: DOMPurify.sanitize(input.username as string),
    password: DOMPurify.sanitize(input.password),
    email: DOMPurify.sanitize(input.email),
  };
  return sanitisedUser;
};
