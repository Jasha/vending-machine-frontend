import React, { useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MoneyIcon from '@mui/icons-material/Money';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

import DepositModal from 'components/DepositModal/DepositModal';
import ROUTES from 'routes/constants';
import PageContainer from 'components/PageContainer/PageContainer';

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeposit = () => {
    setIsOpen(true);
  };

  const handlePurchase = () => {
    navigate(ROUTES.PURCHASE);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <PageContainer title="Vending Machine">
      <Grid container sx={style.cards}>
        <Grid item>
          <Button variant="outlined" sx={style.button} onClick={handleDeposit}>
            <MoneyIcon />
            Deposit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            sx={style.button}
            onClick={handlePurchase}
          >
            <ShoppingCartIcon />
            Purchase
          </Button>
        </Grid>
      </Grid>
      <DepositModal open={isOpen} onCancel={handleCancel} />
    </PageContainer>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  cards: {
    mt: 4,
    justifyContent: 'space-around',
    width: '100%',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
    '& > div': {
      '@media (min-width: 601px)': {
        width: 'calc(50% - 32px)',
      },
      '@media (max-width: 600px)': {
        width: '100%',
      },
    },
  },
  button: {
    mt: 4,
    width: '100%',
    height: '300px',
    fontSize: '3rem',
    pt: '140px',
    '& > svg': {
      position: 'absolute',
      top: '56px',
      fontSize: '5rem',
    },
  },
};

export default Home;
