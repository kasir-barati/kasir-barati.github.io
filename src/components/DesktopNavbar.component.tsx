import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { toggleTheme } from '../redux/theme.slice';
import { Link } from './Link.component';
import { navBarItems } from './Navbar.component';
import { SearchBox } from './SearchBox.component';

export function DesktopNavbar() {
    const dispatch = useAppDispatch();
    const { darkMode } = useAppSelector(
        (state) => state.themeReducer,
    );
    const theme = useTheme();
    const navigate = useNavigate();

    const blogNavBarItem = navBarItems.find(
        (navBarItem) => navBarItem.href === '/posts',
    );

    if (!blogNavBarItem) {
        throw new Error('blogNavBarItem not found');
    }

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };
    const handleNavigateToPage = (href: string) => {
        navigate(href);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#222' }}>
            <Toolbar>
                <Link href={blogNavBarItem.href} underline="none">
                    <Typography
                        variant="h5"
                        noWrap
                        fontWeight={900}
                        sx={{
                            display: 'block',
                            marginRight: 1,
                            [theme.breakpoints.down(470)]: {
                                display: 'none',
                                marginRight: 0,
                            },
                        }}
                    >
                        {blogNavBarItem.text}
                    </Typography>
                </Link>
                <SearchBox
                    sx={{
                        display: {
                            md: 'flex',
                            xs: 'none',
                        },
                    }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        'display': {
                            xs: 'none',
                            md: 'flex',
                        },
                        '& > *': {
                            marginX: 0.5,
                        },
                    }}
                >
                    <Tooltip
                        title={`Toggle to ${theme.palette.mode} mode`}
                    >
                        <IconButton
                            size="large"
                            onClick={handleThemeToggle}
                        >
                            {darkMode ? (
                                <Brightness4Icon color="primary" />
                            ) : (
                                <Brightness7Icon color="warning" />
                            )}
                        </IconButton>
                    </Tooltip>
                    {navBarItems
                        .filter(
                            (navBarItem) =>
                                navBarItem.href !== '/posts',
                        )
                        .map((navBarItem) => {
                            return (
                                <Tooltip
                                    title={navBarItem.text}
                                    arrow
                                    key={navBarItem.href}
                                >
                                    <IconButton
                                        size="large"
                                        onClick={() =>
                                            handleNavigateToPage(
                                                navBarItem.href,
                                            )
                                        }
                                        color={
                                            !darkMode
                                                ? 'primary'
                                                : 'default'
                                        }
                                    >
                                        {navBarItem.icon}
                                    </IconButton>
                                </Tooltip>
                            );
                        })}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
