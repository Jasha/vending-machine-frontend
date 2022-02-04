import { object, string, number } from 'yup';

import { IProduct } from 'api/types';

interface IUpdateProductForm {
  productName: string;
  cost: number | '';
  amountAvailable: number | '';

  [key: string]: string | number;
}

export const SCHEMA = object().shape({
  productName: string().trim().required('Product name is required'),
  cost: number()
    .min(0, 'Cost cannot be negative number')
    .integer('Cost should be whole number')
    .required('Cost is required'),
  amountAvailable: number()
    .min(0, 'Available amount cannot be negative number')
    .integer('Available amount should be whole number')
    .required('Available amount is required'),
});

export const INITIAL_VALUES = (
  product: IProduct | null,
): IUpdateProductForm => ({
  productName: product?.productName || '',
  cost: product?.cost || '',
  amountAvailable: product?.amountAvailable || 0,
});

export const FIELD_NAMES = {
  PRODUCT_NAME: 'productName',
  COST: 'cost',
  AMOUNT_AVAILABLE: 'amountAvailable',
};
