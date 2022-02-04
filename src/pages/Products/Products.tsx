import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar/AppBar';
import ProductForm from 'components/Forms/Product/ProductForm';
import SellerProducts from 'components/SellerProducts/SellerProducts';
import useGetProducts from 'api/common/useGetProducts';

const PAGE_LIMIT = 6;

const Products: React.FC = () => {
  const [page, setPage] = useState(1);

  const [{ data }, getProducts] = useGetProducts();

  const getProductsPage = useCallback(
    (newPage?: number) => {
      getProducts({ params: { page: newPage || page, limit: PAGE_LIMIT } });
    },
    [getProducts, page],
  );

  useEffect(() => {
    getProductsPage();
  }, [page, getProductsPage]);

  const handleProductAdded = () => {
    if (page !== 1) {
      setPage(1);
    } else {
      getProductsPage(1);
    }
  };

  const handlePageChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setPage(newValue);
  };

  const handleProductManaged = () => {
    getProductsPage();
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="md" component="main" sx={style.container}>
        <Typography variant="h2" align="center" gutterBottom>
          Vending Machine - Products
        </Typography>
        <Box sx={style.content}>
          <ProductForm onDataAdded={handleProductAdded} />
          <SellerProducts
            products={data?.results || []}
            page={page}
            totalPages={data?.totalPages || 0}
            onProductManaged={handleProductManaged}
            onPageChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    pt: 6,
    pb: 6,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

export default Products;
