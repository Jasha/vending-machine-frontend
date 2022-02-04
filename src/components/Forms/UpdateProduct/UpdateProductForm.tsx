import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

import getErrorMessage from 'api/helpers';
import API_ENDPOINTS from 'api/constants';
import { IProduct } from 'api/types';
import useUpdateProduct from 'api/seller/useUpdateProduct';
import TextField from 'components/TextField/TextField';
import { getError, getHelperText } from 'utils/formHelpers';

import { FIELD_NAMES, INITIAL_VALUES, SCHEMA } from './constants';

interface IUpdateProductFormProps {
  product: IProduct | null;
  onCancel: () => void;
  onDataUpdated: () => void;
}

const UpdateProductForm: React.FC<IUpdateProductFormProps> = ({
  product,
  onCancel,
  onDataUpdated,
}: IUpdateProductFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }, updateProduct] = useUpdateProduct();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUES(product),
    validationSchema: SCHEMA,
    onSubmit: (values) => {
      if (!product) return;

      updateProduct({
        url: `${API_ENDPOINTS.PRODUCT}/${product.id}`,
        data: {
          ...values,
          cost: Number(values.cost),
          amountAvailable: Number(values.amountAvailable),
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      formik.resetForm();
      onDataUpdated();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

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
        label="Amount available"
        name={FIELD_NAMES.AMOUNT_AVAILABLE}
        type="number"
        autoComplete="product-amount-available"
        value={formik.values[FIELD_NAMES.AMOUNT_AVAILABLE]}
        onChange={formik.handleChange}
        error={getError(formik, FIELD_NAMES.AMOUNT_AVAILABLE)}
        helperText={getHelperText(formik, FIELD_NAMES.AMOUNT_AVAILABLE)}
      />
      <Box sx={style.actions}>
        <Button type="button" sx={style.button} onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={style.button}
          disabled={!formik.isValid || loading}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectorField: {
    margin: '16px 16px 8px 0',
    width: '100%',
  },
  actions: {
    width: '100%',
  },
  button: {
    height: '56px',
    mt: 2,
    width: '50%',
  },
};

export default UpdateProductForm;
