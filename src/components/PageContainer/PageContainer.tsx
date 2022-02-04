import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AppBar from 'components/AppBar/AppBar';
import { useStore } from 'context/StoreContext';
import useGetUser from 'api/common/useGetUser';
import { getDecodedToken } from 'utils/tokenService';
import API_ENDPOINTS from 'api/constants';
import ACTION_TYPES from 'context/constants';

interface IPageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<IPageContainerProps> = ({
  title,
  children,
}: IPageContainerProps) => {
  const [{ data, loading }, getUser] = useGetUser();
  const [{ user }, dispatch] = useStore();
  const deposit = user?.deposit || 0;

  useEffect(() => {
    if (!user) {
      const claims = getDecodedToken();
      if (!claims?.sub) return;

      getUser({ url: `${API_ENDPOINTS.USER}/${claims.sub}` });
    }
  }, [user, getUser]);

  useEffect(() => {
    if (data) {
      dispatch({ type: ACTION_TYPES.SET_USER, payload: data });
    }
  }, [data, dispatch]);

  return (
    <>
      <AppBar />
      <Container maxWidth="md" component="main" sx={style.container}>
        <Typography variant="h2" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h1"
          align="center"
          sx={{ color: deposit > 0 ? 'green' : 'red' }}
          gutterBottom
        >
          {!loading && (
            <>
              {(deposit / 100).toFixed(2) || 0}
              <Typography component="span" sx={style.currency}>
                $
              </Typography>
            </>
          )}
        </Typography>
        {children}
      </Container>
    </>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  container: {
    pt: 8,
    pb: 6,
  },
  currency: {
    color: 'black',
    ml: 1,
    fontSize: '3rem',
  },
};

export default PageContainer;
