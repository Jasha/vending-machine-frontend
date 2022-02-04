import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { ApiPaginatedResponse, IProduct, UseAxios } from 'api/types';

const useGetProducts = (): UseAxios<
  unknown,
  ApiPaginatedResponse<IProduct>
> => {
  const [{ data, loading, error }, getProducts] = useAxios(
    {
      url: API_ENDPOINTS.PRODUCT,
      method: 'GET',
    },
    {
      manual: true,
    },
  );

  return [{ data, loading, error }, getProducts];
};

export default useGetProducts;
