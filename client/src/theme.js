import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#313131',
        },
        secondary: {
            main: '#e7b418',
        },
        primaryText: {
            main: '#FFFFFF'
        }
    },
});
export default theme;