import { CssBaseline } from '@mui/material';
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
                <Navbar />
                <Routes>
                    {navBarItems.map((navBarItem, index) => (
                        <Route
                            key={index}
                            path={navBarItem.href}
                            element={navBarItem.component}
                        />
                    ))}
                </Routes>
                <Notification />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
