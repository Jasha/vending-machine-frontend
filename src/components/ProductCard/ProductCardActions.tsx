import React from 'react';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/RemoveCircle';

interface IProductCardActionsProps {
  amountToBuy: number;
  isLoading: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  onBuy: () => void;
}

const ProductCardActions: React.FC<IProductCardActionsProps> = ({
  amountToBuy,
  isLoading,
  onDecrease,
  onIncrease,
  onBuy,
}: IProductCardActionsProps) => (
  <CardActions>
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={onDecrease}>
          <RemoveIcon />
        </IconButton>
        <Typography component="span">{amountToBuy}</Typography>
        <IconButton onClick={onIncrease}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Button size="small" disabled={isLoading} onClick={onBuy}>
          Buy
        </Button>
      </Grid>
    </Grid>
  </CardActions>
);

export default ProductCardActions;
