import { PaletteMode, createTheme } from '@mui/material';

// Mirrors the digital twin palette in twin/src/styles.py
const palettes = {
    dark: {
        primary: { main: '#40e0d0', contrastText: '#10151a' },
        background: { default: '#10151a', paper: '#161c22' },
        text: { primary: '#eef2f4', secondary: '#8b98a3' },
        divider: 'rgba(64, 224, 208, 0.16)',
    },
    light: {
        // Darker than the twin's turquoise to stay readable as text
        primary: { main: '#0f766e', contrastText: '#ffffff' },
        background: { default: '#f2f6f7', paper: '#ffffff' },
        text: { primary: '#16211f', secondary: '#5c6b70' },
        divider: 'rgba(15, 118, 110, 0.22)',
    },
};

export function createAppTheme(mode: PaletteMode) {
    return createTheme({
        palette: { mode, ...palettes[mode] },
        shape: { borderRadius: 10 },
        typography: {
            fontFamily:
                "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            h1: { fontSize: '2rem', fontWeight: 700 },
            h2: { fontSize: '1.375rem', fontWeight: 700 },
            h3: { fontSize: '1.125rem', fontWeight: 700 },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
            MuiPaper: {
                styleOverrides: { root: { backgroundImage: 'none' } },
            },
            MuiCard: {
                defaultProps: { variant: 'outlined' },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
            },
        },
    });
}
