import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { IProduct, UseAxios } from 'api/types';

interface IRequest {
  productId: string;
  amount: number;
}

interface IResponse {
  total: number;
  product: IProduct;
  change: Array<number>;
}

const useBuyProduct = (): UseAxios<IRequest, IResponse> => {
  const [{ data, loading, error }, buyProduct] = useAxios(
    {
      url: API_ENDPOINTS.BUY_PRODUCT,
      method: 'POST',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, buyProduct];
};

export default useBuyProduct;
