import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Palette {
        parBlue: Palette['primary'];
    }
  
    interface PaletteOptions {
        parBlue?: PaletteOptions['primary'];
    }
  }

  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        parBlue: true;
    }
  }
  

 const theme = createTheme({
    palette: {
      parBlue: {
        main: '#0a3450',
        light: '#0d4367',
        dark: '#072539',
        contrastText: 'white',
      }
    },
  });
  
  export default theme;