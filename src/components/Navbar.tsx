import AppsIcon from '@mui/icons-material/Apps';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarSrc from '../assets/me.jpg';
import { Book } from './Book';
import { Contact } from './Contact';
import { Home } from './Home';
import { Portfolio } from './Portfolio';
import { Resume } from './Resume';

export const navBarItems = [
    {
        icon: <HomeIcon />,
        text: 'Home',
        href: '/',
        component: <Home />,
    },
    {
        icon: <AssignmentIndIcon />,
        text: 'Resume',
        href: '/resume',
        component: <Resume />,
    },
    {
        icon: <AppsIcon />,
        text: 'Portfolio',
        href: '/portfolio',
        component: <Portfolio />,
    },
    {
        icon: <ContactMailIcon />,
        text: 'Contact',
        href: '/contact',
        component: <Contact />,
    },
    {
        icon: <MenuBookIcon />,
        text: 'Book',
        href: '/book',
        component: <Book />,
    },
];

export function Navbar() {
    // TODO: Use nanostores
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    return (
        <>
            <Box component="nav">
                <AppBar
                    position="static"
                    sx={{
                        background: '#222',
                        margin: 0,
                    }}
                >
                    <Toolbar>
                        <IconButton
                            onClick={() => setIsNavBarOpen(true)}
                        >
                            <MenuIcon color="error" />
                        </IconButton>
                        <Typography variant="h5" color="cyan">
                            Portfolio
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                open={isNavBarOpen}
                anchor="right"
                onClose={() => setIsNavBarOpen(false)}
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
                                    color="tan"
                                    to={navBarItem.href}
                                    key={index}
                                >
                                    <ListItemButton>
                                        <ListItemIcon color="white">
                                            {navBarItem.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                color="white"
                                                fontWeight="600"
                                            >
                                                {navBarItem.text}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
