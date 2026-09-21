import { Box, CssBaseline } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, navBarItems } from './components/Navbar.component';
import { Notification } from './components/Notification.component';
import { AwsFlashcardsList } from './pages/AwsFlashcardsList.page';
import { ThemeProvider } from './providers/Theme.provider';

function App() {
    return (
        <ThemeProvider>
            <HashRouter>
                <CssBaseline />
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100dvh"
                >
                    <Navbar />
                    <Box
                        component="main"
                        flex="1 1 auto"
                        minHeight={0}
                        sx={{ overflowY: 'auto' }}
                    >
                        <Routes>
                            {navBarItems.map((navBarItem, index) => (
                                <Route
                                    key={index}
                                    path={navBarItem.href}
                                    element={navBarItem.component}
                                />
                            ))}
                            <Route
                                path="/aws-flashcards"
                                element={<AwsFlashcardsList />}
                            />
                        </Routes>
                    </Box>
                </Box>
                <Notification />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
