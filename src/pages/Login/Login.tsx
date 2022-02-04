import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import LoginForm from 'components/Forms/Login/LoginForm';
import ROUTES from 'routes/constants';
import { USER_ROLES } from 'utils/constants';
import { getDecodedToken } from 'utils/tokenService';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const claims = getDecodedToken();
    if (!claims) return;

    navigate(
      claims.role === USER_ROLES.SELLER ? ROUTES.PRODUCTS : ROUTES.HOME,
      {
        replace: true,
      },
    );
  }, [navigate]);

  const handleSignUpClick = () => {
    navigate(ROUTES.SIGN_UP);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={style.content}>
        <Avatar sx={style.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={handleSignUpClick}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const style = {
  content: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    m: 1,
    bgcolor: 'secondary.main',
  },
} as const;

export default Login;
