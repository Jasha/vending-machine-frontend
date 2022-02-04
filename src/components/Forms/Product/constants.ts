import { object, string, number } from 'yup';

interface IProductForm {
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
    .integer('Available amount should be whole number'),
});

export const INITIAL_VALUES: IProductForm = {
  productName: '',
  cost: '',
  amountAvailable: 0,
};

export const FIELD_NAMES = {
  PRODUCT_NAME: 'productName',
  COST: 'cost',
  AMOUNT_AVAILABLE: 'amountAvailable',
};
