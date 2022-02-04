import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import { getDecodedToken, getTokens, removeTokens } from 'utils/tokenService';
import ROUTES from 'routes/constants';
import useLogout from 'api/common/useLogout';

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const claims = getDecodedToken();
  const [{ data }, logout] = useLogout();

  useEffect(() => {
    if (data != null) {
      removeTokens();
      navigate(ROUTES.LOGIN);
    }
  }, [data, navigate]);

  const handleLogout = () => {
    const tokens = getTokens();
    if (!tokens) return;

    logout({ data: { refreshToken: tokens.refresh.token } });
  };

  return (
    <MuiAppBar
      position="static"
      color="default"
      elevation={0}
      sx={style.appBar}
    >
      <Toolbar sx={style.toolbar}>
        <Typography variant="h6" color="inherit" noWrap sx={style.title}>
          Hello, {claims?.username || ''}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={style.button}
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  appBar: {
    borderBottom: '1px solid lightgray',
  },
  toolbar: {
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      alignSelf: 'flex-end',
    },
  },
  title: {
    flexGrow: 1,
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  button: {
    my: 1,
    mx: 1.5,
  },
};

export default AppBar;
