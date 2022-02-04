import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import UpdateProductForm from 'components/Forms/UpdateProduct/UpdateProductForm';
import { IProduct } from 'api/types';

interface IUpdateModalProps {
  open: boolean;
  product: IProduct | null;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateModal: React.FC<IUpdateModalProps> = ({
  open,
  product,
  onClose,
  onUpdated,
}: IUpdateModalProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Update</DialogTitle>
    <DialogContent>
      <UpdateProductForm
        product={product}
        onCancel={onClose}
        onDataUpdated={onUpdated}
      />
    </DialogContent>
  </Dialog>
);

export default UpdateModal;
