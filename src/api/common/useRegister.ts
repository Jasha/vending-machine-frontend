import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IUser, UseAxios } from 'api/types';

interface IRequest {
  username: string;
  password: string;
  role: string;
}

const useRegister = (): UseAxios<IRequest, IUser> => {
  const [{ data, loading, error }, register] = useAxios(
    {
      url: API_ENDPOINTS.USER,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, register];
};

export default useRegister;
