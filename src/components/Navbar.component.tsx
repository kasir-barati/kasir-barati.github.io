import { useMediaQuery } from '@mui/material';
import {
    BoldIcon,
    BookOpenIcon,
    FileUserIcon,
    HouseIcon,
    LayoutGridIcon,
} from 'lucide-react';
import { Book } from '../pages/Book.page';
import { Home } from '../pages/Home.page';
import { Portfolio } from '../pages/Portfolio.page';
import { PostList } from '../pages/PostList.page';
import { Resume } from '../pages/Resume.page';
import { DesktopNavbar } from './DesktopNavbar.component';
import { MobileNavbar } from './MobileNavbar.component';

export const navBarItems = [
    {
        icon: <HouseIcon />,
        text: 'Home',
        href: '/',
        component: <Home />,
    },
    {
        icon: <FileUserIcon />,
        text: 'Resume',
        href: '/resume',
        component: <Resume />,
    },
    {
        icon: <LayoutGridIcon />,
        text: 'Portfolio',
        href: '/portfolio',
        component: <Portfolio />,
    },
    {
        icon: <BookOpenIcon />,
        text: 'Book',
        href: '/book',
        component: <Book />,
    },
    {
        icon: <BoldIcon />,
        text: 'My Posts',
        href: '/posts',
        component: <PostList />,
    },
];

export const noteLinks = [
    {
        text: 'Dev.to Posts',
        href: 'https://kasir-barati.github.io/dev.to/',
    },
    {
        text: 'Python Notes',
        href: 'https://kasir-barati.github.io/python/',
    },
    {
        text: 'Golang Notes',
        href: 'https://kasir-barati.github.io/golang/',
    },
];

export function Navbar() {
    const minWidth600px = useMediaQuery('(min-width:600px)');

    return (
        <>{minWidth600px ? <DesktopNavbar /> : <MobileNavbar />}</>
    );
}
