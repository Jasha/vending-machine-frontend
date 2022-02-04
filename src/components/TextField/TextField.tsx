import React from 'react';
import { SxProps, Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { FormikHandlers } from 'formik';

import type { HelperText } from 'utils/formHelpers';

interface IVendingMachineTextFieldProps {
  sx?: SxProps<Theme>;
  name: string;
  label: string;
  autoComplete: string;
  required?: boolean;
  type?: string;
  autoFocus?: boolean;
  value: string | number;
  onChange: FormikHandlers['handleChange'];
  error: boolean | undefined;
  helperText: HelperText;
  inputProps?: Object;
}

const VendingMachineTextField: React.FC<IVendingMachineTextFieldProps> = ({
  sx,
  autoComplete,
  autoFocus,
  name,
  label,
  type,
  required,
  value,
  onChange,
  error,
  helperText,
  inputProps,
}: IVendingMachineTextFieldProps) => (
  <TextField
    sx={sx}
    margin="normal"
    autoComplete={autoComplete}
    name={name}
    required={required}
    fullWidth
    id={name}
    label={label}
    type={type}
    autoFocus={autoFocus}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    inputProps={inputProps}
  />
);

VendingMachineTextField.defaultProps = {
  sx: {},
  autoFocus: false,
  required: true,
  type: 'text',
  inputProps: {},
};

export default VendingMachineTextField;
