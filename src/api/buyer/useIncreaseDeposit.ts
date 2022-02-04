import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IUser, UseAxios } from 'api/types';

interface IRequest {
  deposit: number;
}

const useIncreaseDeposit = (): UseAxios<IRequest, IUser> => {
  const [{ data, loading, error }, increaseDeposit] = useAxios(
    {
      url: API_ENDPOINTS.DEPOSIT_INCREASE,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, increaseDeposit];
};

export default useIncreaseDeposit;
