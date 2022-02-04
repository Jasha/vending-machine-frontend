import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import VendingMachineRoutes from 'routes/Routes';
import { StoreProvider } from 'context/StoreContext';

const theme = createTheme();

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider>
      <VendingMachineRoutes />
    </StoreProvider>
  </ThemeProvider>
);

export default App;
