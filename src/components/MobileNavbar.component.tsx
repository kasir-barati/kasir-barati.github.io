import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar,
} from '@mui/material';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Brand } from './Brand.component';
import { navBarItems, noteLinks } from './Navbar.component';
import { SearchBox } from './SearchBox.component';
import { ThemeToggle } from './ThemeToggle.component';

export function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const close = () => setIsOpen(false);

    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <Brand />
                    <Box sx={{ flexGrow: 1 }} />
                    <ThemeToggle />
                    <IconButton
                        color="primary"
                        edge="end"
                        aria-label="Open menu"
                        onClick={() => setIsOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={isOpen} anchor="right" onClose={close}>
                <Box sx={{ width: 280 }}>
                    <Box sx={{ p: 2 }}>
                        <SearchBox onSearch={close} />
                    </Box>
                    <Divider />
                    <List component="nav">
                        {navBarItems.map((navBarItem) => (
                            <ListItemButton
                                key={navBarItem.href}
                                component={NavLink}
                                to={navBarItem.href}
                                selected={
                                    pathname === navBarItem.href
                                }
                                onClick={close}
                            >
                                {/* Lines up with the inset links below */}
                                <ListItemIcon sx={{ minWidth: 56 }}>
                                    {navBarItem.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {navBarItem.text}
                                </ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                    <Divider />
                    <List
                        subheader={
                            <ListSubheader>Writing</ListSubheader>
                        }
                    >
                        {noteLinks.map((noteLink) => (
                            <ListItemButton
                                component="a"
                                href={noteLink.href}
                                rel="noopener noreferrer"
                                key={noteLink.href}
                            >
                                <ListItemText inset>
                                    {noteLink.text}
                                </ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
