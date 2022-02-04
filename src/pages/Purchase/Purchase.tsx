import React, { useCallback, useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import useBuyProduct from 'api/buyer/useBuyProduct';
import useGetProducts from 'api/common/useGetProducts';
import getErrorMessage from 'api/helpers';
import ProductCard from 'components/ProductCard/ProductCard';
import { IProduct } from 'api/types';
import PageContainer from 'components/PageContainer/PageContainer';
import { useStore } from 'context/StoreContext';
import ACTION_TYPES from 'context/constants';

const PAGE_LIMIT = 6;

const Purchase: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [{ data, loading, error }, buy] = useBuyProduct();
  const [{ data: productsData }, getProducts] = useGetProducts();
  const { enqueueSnackbar } = useSnackbar();
  const [{ user }, dispatch] = useStore();

  const getProductsPage = useCallback(
    (newPage?: number) => {
      getProducts({ params: { page: newPage || page, limit: PAGE_LIMIT } });
    },
    [getProducts, page],
  );

  useEffect(() => {
    getProductsPage();
  }, [page, getProductsPage]);

  useEffect(() => {
    if (productsData) {
      if (page === 1) {
        setProducts([...productsData.results]);
      } else {
        setProducts([...products, ...productsData.results]);
      }
    }
  }, [productsData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      if (user) {
        dispatch({
          type: ACTION_TYPES.SET_USER,
          payload: { ...user, deposit: user.deposit - data.total },
        });
      }

      if (page !== 1) {
        setPage(1);
      } else {
        getProductsPage(1);
      }

      enqueueSnackbar(`Successfully spent ${(data.total / 100).toFixed(2)}$.`, {
        variant: 'success',
      });
    }
  }, [data, dispatch, enqueueSnackbar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  const handleBuy = (buyData: { productId: string; amount: number }) => {
    buy({ data: buyData });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <PageContainer title="Vending Machine - Purchase">
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid item key={item.id}>
            <ProductCard product={item} isLoading={loading} onBuy={handleBuy} />
          </Grid>
        ))}
      </Grid>
      {productsData?.page < productsData?.totalPages && (
        <Button sx={style.button} onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </PageContainer>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  button: {
    mt: 2,
  },
};

export default Purchase;
