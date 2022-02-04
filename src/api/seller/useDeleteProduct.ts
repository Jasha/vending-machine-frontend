import useAxios from 'api/useAxios';
import API_ENDPOINTS from 'api/constants';
import { UseAxios } from 'api/types';

const useDeleteProduct = (): UseAxios<unknown, unknown> => {
  const [{ response, data, loading, error }, deleteProduct] = useAxios(
    {
      url: API_ENDPOINTS.PRODUCT,
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  return [{ response, data, loading, error }, deleteProduct];
};

export default useDeleteProduct;
