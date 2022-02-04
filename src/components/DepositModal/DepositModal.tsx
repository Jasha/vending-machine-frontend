import React, { useEffect } from 'react';
import { SxProps, Theme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useSnackbar } from 'notistack';

import { DENOMINATIONS } from 'utils/constants';
import useIncreaseDeposit from 'api/buyer/useIncreaseDeposit';
import useResetDeposit from 'api/buyer/useResetDeposit';
import getErrorMessage from 'api/helpers';
import { useStore } from 'context/StoreContext';
import ACTION_TYPES from 'context/constants';

interface IDepositModalProps {
  open: boolean;
  onCancel: () => void;
}

const DepositModal: React.FC<IDepositModalProps> = ({
  open,
  onCancel,
}: IDepositModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [
    { data: increaseData, loading: increaseLoading, error: increaseError },
    increase,
  ] = useIncreaseDeposit();
  const [{ data: resetData, loading: resetLoading, error: resetError }, reset] =
    useResetDeposit();
  const loading = increaseLoading || resetLoading;

  const [{ user }, dispatch] = useStore();
  const deposit = user?.deposit || 0;

  useEffect(() => {
    if (increaseData) {
      dispatch({ type: ACTION_TYPES.SET_USER, payload: increaseData });
      enqueueSnackbar('Successfully increased.', { variant: 'success' });
    }
  }, [increaseData, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (resetData) {
      dispatch({ type: ACTION_TYPES.SET_USER, payload: resetData });
      enqueueSnackbar('Successfully withdraw.', { variant: 'success' });
    }
  }, [resetData, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (increaseError) {
      enqueueSnackbar(getErrorMessage(increaseError), { variant: 'error' });
    }
  }, [increaseError, enqueueSnackbar]);

  useEffect(() => {
    if (resetError) {
      enqueueSnackbar(getErrorMessage(resetError), { variant: 'error' });
    }
  }, [resetError, enqueueSnackbar]);

  const handleDeposit = (item: number) => () => {
    increase({ data: { deposit: item } });
  };

  const handleWithdraw = () => {
    reset();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Current balance: {(deposit / 100).toFixed(2)} $</DialogTitle>
      <DialogContent dividers>
        <Grid container justifyContent="space-between">
          {DENOMINATIONS.map((item) => (
            <Grid key={item} item sx={style.buttonBlock}>
              <Button
                variant="outlined"
                disabled={loading}
                onClick={handleDeposit(item)}
              >
                {item}
              </Button>
            </Grid>
          ))}
          <Grid item sx={style.buttonBlock}>
            <Button
              color="secondary"
              disabled={loading}
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const style: { [key: string]: SxProps<Theme> } = {
  buttonBlock: {
    mt: 2,
    width: '30%',
    '& > button': {
      fontSize: '1.5rem',
      height: '64px',
      width: '100%',
    },
  },
};

export default DepositModal;
