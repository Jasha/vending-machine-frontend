import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { ITokens, IUser, UseAxios } from 'api/types';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: IUser;
  tokens: ITokens;
  activeTokens: number;
}

const useLogin = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, login] = useAxios(
    {
      url: API_ENDPOINTS.LOGIN,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, login];
};

export default useLogin;
