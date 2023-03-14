import React from 'react';

import { useTheme } from './theme/useTheme';

import { ThemeProvider } from '@mui/material';

const App = () => {
  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
  );
}

export default App;
