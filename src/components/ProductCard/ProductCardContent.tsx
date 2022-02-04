import React from 'react';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { IProduct } from 'api/types';

interface IProductCardContentProps {
  product: IProduct;
  amountToBuy: number;
}

const ProductCardContent: React.FC<IProductCardContentProps> = ({
  product,
  amountToBuy,
}: IProductCardContentProps) => (
  <CardContent>
    <Typography variant="h5" gutterBottom>
      {product.productName}
    </Typography>
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography>Available</Typography>
      </Grid>
      <Grid item>
        <Typography>Cost per item</Typography>
      </Grid>
    </Grid>
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h5">
          {product.amountAvailable - amountToBuy}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {(product.cost / 100).toFixed(2)} $
        </Typography>
      </Grid>
    </Grid>
  </CardContent>
);

export default ProductCardContent;
