import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IProduct, UseAxios } from 'api/types';

interface IRequest {
  amountAvailable?: number;
  cost: number;
  productName: string;
}

const useCreateProduct = (): UseAxios<IRequest, IProduct> => {
  const [{ data, loading, error }, createProduct] = useAxios(
    {
      url: API_ENDPOINTS.PRODUCT,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, createProduct];
};

export default useCreateProduct;
