import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import useLogin from 'api/common/useLogin';
import getErrorMessage from 'api/helpers';
import { getTokens, setTokens } from 'utils/tokenService';
import ROUTES from 'routes/constants';
import TextField from 'components/TextField/TextField';
import { USER_ROLES } from 'utils/constants';
import { getError, getHelperText } from 'utils/formHelpers';
import useLogoutAll from 'api/common/useLogoutAll';

import { FIELD_NAMES, INITIAL_VALUES, SCHEMA } from './constants';
import ActiveSessionsModal from './ActiveSessionsModal';

const LoginForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [{ data, loading, error }, login] = useLogin();
  const [{ data: logoutAllData }, logoutAll] = useLogoutAll();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      login({ data: values });
    },
  });

  const handleLoginConfirm = useCallback(() => {
    navigate(
      data.user.role === USER_ROLES.SELLER ? ROUTES.PRODUCTS : ROUTES.HOME,
      {
        replace: true,
      },
    );
  }, [navigate, data?.user.role]);

  useEffect(() => {
    if (!data) return;

    if (data.activeTokens > 0) {
      setIsOpen(true);
    } else {
      handleLoginConfirm();
    }

    setTokens(data.tokens);
  }, [data, handleLoginConfirm]);

  useEffect(() => {
    if (logoutAllData != null) {
      setIsOpen(false);
      handleLoginConfirm();
    }
  }, [logoutAllData, handleLoginConfirm]);

  const handleLogoutAll = () => {
    const tokens = getTokens();
    if (!tokens) {
      setIsOpen(false);
      handleLoginConfirm();
    } else {
      logoutAll({ data: { refreshToken: tokens.refresh.token } });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={style.form}
    >
      {error && (
        <Alert severity="error" sx={style.alert}>
          {getErrorMessage(error)}
        </Alert>
      )}
      <TextField
        label="Username"
        name={FIELD_NAMES.USERNAME}
        autoComplete="username"
        autoFocus
        value={formik.values[FIELD_NAMES.USERNAME]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.USERNAME)}
        helperText={getHelperText(formik, FIELD_NAMES.USERNAME)}
      />
      <TextField
        label="Password"
        name={FIELD_NAMES.PASSWORD}
        type="password"
        autoComplete="current-password"
        value={formik.values[FIELD_NAMES.PASSWORD]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.PASSWORD)}
        helperText={getHelperText(formik, FIELD_NAMES.PASSWORD)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={style.button}
        disabled={!formik.isValid || loading}
      >
        Login
      </Button>
      <ActiveSessionsModal
        open={isOpen}
        onLogin={handleLoginConfirm}
        onLogoutAll={handleLogoutAll}
      />
    </Box>
  );
};

const style = {
  form: {
    mt: 1,
  },
  alert: {
    mt: 3,
    mb: 2,
    width: '100%',
  },
  button: {
    mt: 3,
    mb: 2,
  },
} as const;

export default LoginForm;
