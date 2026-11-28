import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { PropsWithChildren, useMemo } from 'react';
import { useAppSelector } from '../hooks/redux.hook';
import { createAppTheme } from './theme';

export function ThemeProvider({ children }: PropsWithChildren) {
    const { darkMode } = useAppSelector(
        (state) => state.themeReducer,
    );
    const theme = useMemo(
        () => createAppTheme(darkMode ? 'dark' : 'light'),
        [darkMode],
    );

    return (
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    );
}
