import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import avatarSrc from '../assets/me.jpg';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { toggleTheme } from '../redux/theme.slice';
import { Link } from './Link.component';
import { navBarItems } from './Navbar.component';

export function MobileNavbar() {
    const [isMobileNavBarOpen, setIsMobileNavBarOpen] =
        useState(false);
    const { darkMode } = useAppSelector(
        (state) => state.themeReducer,
    );
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: '#222',
                    margin: 0,
                }}
            >
                <Toolbar>
                    <IconButton
                        onClick={() => setIsMobileNavBarOpen(true)}
                    >
                        <MenuIcon color="error" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={isMobileNavBarOpen}
                anchor="right"
                onClose={() => setIsMobileNavBarOpen(false)}
            >
                <Box
                    width="250px"
                    height="100%"
                    bgcolor="#511"
                    component="div"
                >
                    <Avatar
                        src={avatarSrc}
                        alt="Kasir Barati"
                        sx={{
                            display: 'block',
                            margin: '0.5rem auto',
                            width: 57,
                            height: 57,
                        }}
                    />
                    <Divider />
                    <List>
                        {navBarItems.map((navBarItem, index) => {
                            return (
                                <Link
                                    href={navBarItem.href}
                                    key={index}
                                    underline="none"
                                    color={
                                        !darkMode
                                            ? 'primary.main'
                                            : 'white'
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {navBarItem.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography>
                                                {navBarItem.text}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                        <ListItemButton onClick={handleThemeToggle}>
                            <ListItemIcon>
                                {darkMode ? (
                                    <Brightness4Icon color="primary" />
                                ) : (
                                    <Brightness7Icon color="warning" />
                                )}
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    color={
                                        !darkMode
                                            ? 'primary.main'
                                            : 'white'
                                    }
                                >
                                    {`Toggle to ${theme.palette.mode} mode`}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
