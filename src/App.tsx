import { Box, CssBaseline } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, navBarItems } from './components/Navbar.component';
import { Notification } from './components/Notification.component';
import { ThemeProvider } from './providers/Theme.provider';

function App() {
    return (
        <ThemeProvider>
            <HashRouter>
                <CssBaseline />
                <Box
                    display="flex"
                    flexDirection="column"
                    height={{ xs: 'auto', sm: '100dvh' }}
                >
                    <Navbar />
                    <Box
                        component="main"
                        flex={{ xs: '0 0 auto', sm: '1 1 auto' }}
                        minHeight={0}
                    >
                        <Routes>
                            {navBarItems.map((navBarItem, index) => (
                                <Route
                                    key={index}
                                    path={navBarItem.href}
                                    element={navBarItem.component}
                                />
                            ))}
                        </Routes>
                    </Box>
                </Box>
                <Notification />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
