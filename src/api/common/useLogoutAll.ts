import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

interface IRequest {
  refreshToken: string;
}

const useLogoutAll = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, logoutAll] = useAxios(
    {
      url: API_ENDPOINTS.LOGOUT_ALL,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, logoutAll];
};

export default useLogoutAll;
