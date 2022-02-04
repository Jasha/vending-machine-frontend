import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import getErrorMessage from 'api/helpers';
import useCreateProduct from 'api/seller/useCreateProduct';
import TextField from 'components/TextField/TextField';
import { getError, getHelperText } from 'utils/formHelpers';

import { FIELD_NAMES, INITIAL_VALUES, SCHEMA } from './constants';

interface IProductFormProps {
  onDataAdded: () => void;
}

const ProductForm: React.FC<IProductFormProps> = ({
  onDataAdded,
}: IProductFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }, createProduct] = useCreateProduct();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      createProduct({
        data: {
          ...values,
          cost: Number(values.cost),
          amountAvailable: Number(values.amountAvailable) || 0,
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      onDataAdded();

      formik.resetForm();
      enqueueSnackbar('Successfully added entry.', { variant: 'success' });
    }
  }, [data, enqueueSnackbar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
      sx={style.form}
    >
      <TextField
        sx={style.field}
        label="Product name"
        name={FIELD_NAMES.PRODUCT_NAME}
        autoComplete="product-name"
        autoFocus
        value={formik.values[FIELD_NAMES.PRODUCT_NAME]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.PRODUCT_NAME)}
        helperText={getHelperText(formik, FIELD_NAMES.PRODUCT_NAME)}
      />
      <TextField
        sx={style.field}
        label="Cost"
        name={FIELD_NAMES.COST}
        type="number"
        autoComplete="product-cost"
        value={formik.values[FIELD_NAMES.COST]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.COST)}
        helperText={getHelperText(formik, FIELD_NAMES.COST)}
        inputProps={{ step: 5 }}
      />
      <TextField
        required={false}
        sx={style.field}
        label="Amount available"
        name={FIELD_NAMES.AMOUNT_AVAILABLE}
        type="number"
        autoComplete="product-amount-available"
        value={formik.values[FIELD_NAMES.AMOUNT_AVAILABLE]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.AMOUNT_AVAILABLE)}
        helperText={getHelperText(formik, FIELD_NAMES.AMOUNT_AVAILABLE)}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={style.button}
        endIcon={<SendIcon />}
        disabled={!formik.isValid || loading}
      >
        Add
      </Button>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    pb: 8,
    width: '100%',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  field: {
    mr: 2,
  },
  button: {
    height: '56px',
    mt: 2,
    '@media (max-width: 600px)': {
      width: '100%',
    },
    '@media (min-width: 601px)': {
      width: '30%',
    },
  },
};

export default ProductForm;
