import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IProduct } from 'api/types';

interface IProductsTableProps {
  rows: Array<IProduct>;
  onUpdate: (entry: IProduct) => () => void;
  onDelete: (id: string) => () => void;
}

const ProductsTable: React.FC<IProductsTableProps> = ({
  rows,
  onUpdate,
  onDelete,
}: IProductsTableProps) => (
  <Table size="small" sx={style.table}>
    <TableHead>
      <TableRow>
        <TableCell width="40%">Product name</TableCell>
        <TableCell>Available amount</TableCell>
        <TableCell align="right">Cost</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell width="40%">{row.productName}</TableCell>
          <TableCell>{row.amountAvailable}</TableCell>
          <TableCell align="right">{row.cost}</TableCell>
          <TableCell align="center">
            <IconButton color="primary" onClick={onUpdate(row)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={onDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const style: { [key: string]: SxProps<Theme> } = {
  table: {
    width: '100%',
  },
};

export default ProductsTable;
