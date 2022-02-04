import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  refreshToken: string;
}

const useLogout = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, logout] = useAxios(
    {
      url: API_ENDPOINTS.LOGOUT,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, logout];
};

export default useLogout;
