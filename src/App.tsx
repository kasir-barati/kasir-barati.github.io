import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, navBarItems } from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
