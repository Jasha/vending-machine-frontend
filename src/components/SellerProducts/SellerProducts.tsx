import React, { ChangeEvent, useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import getErrorMessage from 'api/helpers';
import API_ENDPOINTS from 'api/constants';
import { IProduct } from 'api/types';
import useDeleteProduct from 'api/seller/useDeleteProduct';

import ProductsTable from './ProductsTable';
import UpdateModal from './UpdateModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface ISellerProductsProps {
  products: IProduct[];
  page: number;
  totalPages: number;
  onProductManaged: () => void;
  onPageChange: (event: ChangeEvent<unknown>, newValue: number) => void;
}

const SellerProducts: React.FC<ISellerProductsProps> = ({
  products,
  page,
  totalPages,
  onProductManaged,
  onPageChange,
}: ISellerProductsProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatingEntry, setUpdatingEntry] = useState<IProduct | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const [{ response: deleteResponse, error: deleteError }, deleteProduct] =
    useDeleteProduct();

  const closeUpdateModal = () => {
    setUpdatingEntry(null);
    setIsUpdateOpen(false);
  };

  const closeDeleteModal = () => {
    setDeletingId('');
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    if (deleteResponse) {
      closeDeleteModal();
      onProductManaged();
      enqueueSnackbar('Successfully deleted.', { variant: 'success' });
    }
  }, [deleteResponse, enqueueSnackbar]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (deleteError) {
      enqueueSnackbar(getErrorMessage(deleteError), { variant: 'error' });
    }
  }, [deleteError, enqueueSnackbar]);

  const handleDeleteClick = (id: string) => () => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleUpdateClick = (entry: IProduct) => () => {
    setUpdatingEntry(entry);
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    closeUpdateModal();
  };

  const handleDeleteCancel = () => {
    closeDeleteModal();
  };

  const handleUpdated = () => {
    closeUpdateModal();
    onProductManaged();
    enqueueSnackbar('Successfully updated.', { variant: 'success' });
  };

  const handleDeleteConfirm = () => {
    deleteProduct({ url: `${API_ENDPOINTS.PRODUCT}/${deletingId}` });
  };

  return (
    <Box sx={style.list}>
      <Typography variant="h6" color="primary" gutterBottom>
        Recent logs
      </Typography>
      <ProductsTable
        rows={products}
        onUpdate={handleUpdateClick}
        onDelete={handleDeleteClick}
      />
      {totalPages > 1 && (
        <Pagination
          sx={style.pagination}
          count={totalPages}
          page={page}
          onChange={onPageChange}
          showFirstButton
          showLastButton
        />
      )}
      <UpdateModal
        open={isUpdateOpen}
        product={updatingEntry}
        onClose={handleCloseUpdate}
        onUpdated={handleUpdated}
      />
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  list: {
    pt: 6,
    width: '100%',
  },
  table: {
    width: '100%',
  },
  pagination: {
    mt: 3,
    '& > ul': {
      justifyContent: 'center',
    },
  },
};

export default SellerProducts;
