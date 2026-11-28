import {
    AppBar,
    Box,
    Button,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { Brand } from './Brand.component';
import { navBarItems, noteLinks } from './Navbar.component';
import { SearchBox } from './SearchBox.component';
import { ThemeToggle } from './ThemeToggle.component';

export function DesktopNavbar() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(
        null,
    );

    return (
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
            <Toolbar sx={{ gap: 2 }}>
                <Brand />
                <Box
                    component="nav"
                    sx={{ display: 'flex', alignSelf: 'stretch' }}
                >
                    {navBarItems.map((navBarItem) => (
                        <Button
                            key={navBarItem.href}
                            component={NavLink}
                            to={navBarItem.href}
                            color="inherit"
                            sx={{
                                'minWidth': 0,
                                'px': { md: 1, lg: 1.5 },
                                'borderRadius': 0,
                                'borderBottom': 3,
                                'borderTop': 3,
                                'borderColor': 'transparent',
                                'color': 'text.secondary',
                                '&.active': {
                                    color: 'text.primary',
                                    borderBottomColor: 'primary.main',
                                },
                            }}
                        >
                            {navBarItem.text}
                        </Button>
                    ))}
                </Box>
                <Button
                    color="inherit"
                    endIcon={<ChevronDownIcon size={18} />}
                    onClick={(event) =>
                        setAnchorEl(event.currentTarget)
                    }
                    sx={{ color: 'text.secondary', minWidth: 0 }}
                >
                    Writing
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                >
                    {noteLinks.map((noteLink) => (
                        <MenuItem
                            component="a"
                            href={noteLink.href}
                            rel="noopener noreferrer"
                            onClick={() => setAnchorEl(null)}
                            key={noteLink.href}
                        >
                            {noteLink.text}
                        </MenuItem>
                    ))}
                </Menu>
                <SearchBox
                    sx={{
                        ml: 'auto',
                        flex: '0 1 260px',
                        minWidth: 0,
                    }}
                />
                <ThemeToggle />
            </Toolbar>
        </AppBar>
    );
}
