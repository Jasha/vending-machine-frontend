import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

export interface IRequest {
  amountAvailable: number;
  cost: number;
  productName: string;
}

const useUpdateProduct = (): UseAxios<IRequest, unknown> => {
  const [{ data, loading, error }, updateProduct] = useAxios(
    {
      url: API_ENDPOINTS.PRODUCT,
      method: 'PATCH',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, updateProduct];
};

export default useUpdateProduct;
