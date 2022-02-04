import { FormikErrors, FormikState } from 'formik';

export type HelperText =
  | string
  | false
  | FormikErrors<any>
  | string[]
  | FormikErrors<any>[]
  | undefined;

export const getError = (
  formik: FormikState<any>,
  fieldName: string,
): boolean | undefined =>
  formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

export const getHelperText = (
  formik: FormikState<any>,
  fieldName: string,
): HelperText => formik.touched[fieldName] && formik.errors[fieldName];
