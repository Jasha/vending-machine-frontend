import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { DialogActions, SxProps, Theme } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

interface IActiveSessionsModalProps {
  open: boolean;
  onLogin: () => void;
  onLogoutAll: () => void;
}

const ActiveSessionsModal: React.FC<IActiveSessionsModalProps> = ({
  open,
  onLogin,
  onLogoutAll,
}: IActiveSessionsModalProps) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent sx={style.content}>
      <DialogContentText>
        There are another active sessions for your account. Please choose an
        action.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onLogoutAll}>
        Logout all, and sign in
      </Button>
      <Button variant="outlined" onClick={onLogin}>
        Ignore, and just sign in
      </Button>
    </DialogActions>
  </Dialog>
);

const style: { [key: string]: SxProps<Theme> } = {
  content: {
    maxWidth: '460px',
  },
};

export default ActiveSessionsModal;
