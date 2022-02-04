import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IUser, UseAxios } from 'api/types';

const useGetUser = (): UseAxios<unknown, IUser> => {
  const [{ data, loading, error }, getUser] = useAxios(
    {
      url: API_ENDPOINTS.USER,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getUser];
};

export default useGetUser;
