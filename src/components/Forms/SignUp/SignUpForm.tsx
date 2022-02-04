import React, { SyntheticEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import TextField from 'components/TextField/TextField';
import useRegister from 'api/common/useRegister';
import getErrorMessage from 'api/helpers';
import ROUTES from 'routes/constants';
import { getError, getHelperText } from 'utils/formHelpers';

import { FIELD_NAMES, INITIAL_VALUES, SCHEMA } from './constants';
import SuccessModal from './SuccessModal';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [{ data, loading, error }, register] = useRegister();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      register({ data: values });
    },
  });

  useEffect(() => {
    if (data) {
      setIsOpen(true);
      formik.resetForm();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleChange =
    (fieldName: string) => (event: SyntheticEvent, newValue: string) => {
      formik.setFieldValue(fieldName, newValue);
    };

  const handleSuccessConfirm = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      sx={style.form}
    >
      {error && (
        <Alert severity="error" sx={style.alert}>
          {getErrorMessage(error)}
        </Alert>
      )}
      <ToggleButtonGroup
        color="primary"
        value={formik.values[FIELD_NAMES.ROLE]}
        exclusive
        onChange={handleToggleChange(FIELD_NAMES.ROLE)}
        sx={style.toggle}
      >
        <ToggleButton value="buyer">Buyer</ToggleButton>
        <ToggleButton value="seller">Seller</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        autoComplete="username"
        name={FIELD_NAMES.USERNAME}
        label="Username"
        autoFocus
        value={formik.values[FIELD_NAMES.USERNAME]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.USERNAME)}
        helperText={getHelperText(formik, FIELD_NAMES.USERNAME)}
      />
      <TextField
        autoComplete="password"
        name={FIELD_NAMES.PASSWORD}
        label="Password"
        type="password"
        value={formik.values[FIELD_NAMES.PASSWORD]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.PASSWORD)}
        helperText={getHelperText(formik, FIELD_NAMES.USERNAME)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!formik.isValid || loading}
        sx={style.button}
      >
        Sign Up
      </Button>
      <SuccessModal open={isOpen} onConfirm={handleSuccessConfirm} />
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
  toggle: {
    mt: 2,
    width: '100%',
    '& > button': {
      width: '50%',
    },
  },
  button: {
    mt: 3,
    mb: 2,
  },
} as const;

export default SignUp;
