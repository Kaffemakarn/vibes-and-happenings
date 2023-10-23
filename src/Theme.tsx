import { ThemeProvider, createTheme } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8F95D3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D7965A',
      contrastText: '#FFFFFF',
    },
  },
});

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
