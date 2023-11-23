import React from 'react';
import { Paths } from './Routes';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import pink from '@mui/material/colors/pink';
import { orange } from '@mui/material/colors';

import './App.css';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <h1>HEAR.IO</h1>
      <Paths />
    </div>
    </ThemeProvider>
  );
}

export default App;