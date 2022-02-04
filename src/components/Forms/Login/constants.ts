import { object, string } from 'yup';

interface ILoginForm {
  username: string;
  password: string;

  [key: string]: string;
}

export const SCHEMA = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});

export const INITIAL_VALUES: ILoginForm = { username: '', password: '' };

export const FIELD_NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
};
