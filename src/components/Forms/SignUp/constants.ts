import { object, string } from 'yup';
import { USER_ROLES } from 'utils/constants';

interface ISignUpForm {
  username: string;
  role: string;
  password: string;

  [key: string]: string;
}

export const SCHEMA = object().shape({
  username: string().trim().required('Username is required'),
  role: string().oneOf(Object.values(USER_ROLES)).required('Role is required'),
  password: string().trim().required('Password is required'),
});

export const INITIAL_VALUES: ISignUpForm = {
  username: '',
  role: USER_ROLES.BUYER,
  password: '',
};

export const FIELD_NAMES = {
  ROLE: 'role',
  USERNAME: 'username',
  PASSWORD: 'password',
};
