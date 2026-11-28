import { Box, CssBaseline } from '@mui/material';
import { HashRouter, Route, Routes, useLocation } from 'react-router';
import { Navbar, navBarItems } from './components/Navbar.component';
import { Notification } from './components/Notification.component';
import { AwsFlashcardsList } from './pages/AwsFlashcardsList.page';
import { GolangFlashcardsList } from './pages/GolangFlashcardsList.page';
import { ReactFlashcardsList } from './pages/ReactFlashcardsList.page';
import { ThemeProvider } from './providers/Theme.provider';

function App() {
    return (
        <ThemeProvider>
            <HashRouter>
                <CssBaseline enableColorScheme />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100dvh',
                    }}
                >
                    <Navbar />
                    <Main />
                </Box>
                <Notification />
            </HashRouter>
        </ThemeProvider>
    );
}

function Main() {
    const { pathname } = useLocation();

    return (
        // Keyed by pathname so every page starts scrolled to the top
        <Box
            key={pathname}
            component="main"
            sx={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto' }}
        >
            <Routes>
                {navBarItems.map((navBarItem) => (
                    <Route
                        key={navBarItem.href}
                        path={navBarItem.href}
                        element={navBarItem.component}
                    />
                ))}
                <Route
                    path="/aws-flashcards"
                    element={<AwsFlashcardsList />}
                />
                <Route
                    path="/golang-flashcards"
                    element={<GolangFlashcardsList />}
                />
                <Route
                    path="/react-flashcards"
                    element={<ReactFlashcardsList />}
                />
            </Routes>
        </Box>
    );
}

export default App;
