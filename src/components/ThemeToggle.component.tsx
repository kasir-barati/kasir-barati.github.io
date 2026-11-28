import { IconButton, Tooltip } from '@mui/material';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { toggleTheme } from '../redux/theme.slice';

export function ThemeToggle() {
    const dispatch = useAppDispatch();
    const { darkMode } = useAppSelector(
        (state) => state.themeReducer,
    );
    const label = `Switch to ${darkMode ? 'light' : 'dark'} mode`;

    return (
        <Tooltip title={label}>
            <IconButton
                color={darkMode ? 'primary' : 'warning'}
                aria-label={label}
                onClick={() => dispatch(toggleTheme())}
            >
                {darkMode ? <MoonIcon /> : <SunIcon />}
            </IconButton>
        </Tooltip>
    );
}
