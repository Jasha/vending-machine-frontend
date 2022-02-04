import React, { useState } from 'react';
import { Card, SxProps, Theme } from '@mui/material';

import { IProduct } from 'api/types';
import ProductCardContent from 'components/ProductCard/ProductCardContent';
import ProductCardActions from 'components/ProductCard/ProductCardActions';

interface IProductCardProps {
  product: IProduct;
  isLoading: boolean;
  onBuy: (data: { productId: string; amount: number }) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({
  product,
  isLoading,
  onBuy,
}: IProductCardProps) => {
  const [amountToBuy, setAmountToBuy] = useState(0);

  const handleDecreaseAmount = () => {
    if (amountToBuy === 0) return;

    setAmountToBuy(amountToBuy - 1);
  };

  const handleIncreaseAmount = () => {
    if (amountToBuy === product.amountAvailable) return;

    setAmountToBuy(amountToBuy + 1);
  };

  const handleBuy = () => {
    setAmountToBuy(0);
    onBuy({ productId: product.id, amount: amountToBuy });
  };

  return (
    <Card sx={style.card}>
      <ProductCardContent product={product} amountToBuy={amountToBuy} />
      <ProductCardActions
        amountToBuy={amountToBuy}
        isLoading={isLoading}
        onDecrease={handleDecreaseAmount}
        onIncrease={handleIncreaseAmount}
        onBuy={handleBuy}
      />
    </Card>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  card: {
    minWidth: '270px',
  },
};

export default ProductCard;
