import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IUser, UseAxios } from 'api/types';

const useResetDeposit = (): UseAxios<unknown, IUser> => {
  const [{ data, loading, error }, resetDeposit] = useAxios(
    {
      url: API_ENDPOINTS.DEPOSIT_RESET,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, resetDeposit];
};

export default useResetDeposit;
