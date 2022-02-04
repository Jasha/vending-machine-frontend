import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { USER_ROLES } from 'utils/constants';
import ROUTES from 'routes/constants';
import { getDecodedToken } from 'utils/tokenService';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    const claims = getDecodedToken();

    let newRoute = '';
    if (!claims) {
      newRoute = ROUTES.LOGIN;
    } else if (claims.role === USER_ROLES.SELLER) {
      newRoute = ROUTES.PRODUCTS;
    } else {
      newRoute = ROUTES.HOME;
    }

    navigate(newRoute, { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={style.content}>
        <Typography variant="h1" sx={style.title}>
          404
        </Typography>
        <Typography variant="h4">Page Not Found</Typography>
        <Button variant="contained" sx={style.button} onClick={handleClickHome}>
          Go to home
        </Button>
      </Box>
    </Container>
  );
};

const style = {
  title: {
    fontSize: '12rem',
    fontWeight: 700,
    lineHeight: '90%',
  },
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    mt: 12,
  },
} as const;

export default NotFound;
