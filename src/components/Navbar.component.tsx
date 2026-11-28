import { Theme, useMediaQuery } from '@mui/material';
import {
    BoldIcon,
    BookOpenIcon,
    FileUserIcon,
    HouseIcon,
    LayoutGridIcon,
} from 'lucide-react';
import { Goodreads } from '../pages/Goodreads.page';
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
        text: 'Goodreads',
        href: '/goodreads',
        component: <Goodreads />,
    },
    {
        icon: <BoldIcon />,
        text: 'Posts',
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
    const isDesktop = useMediaQuery(
        (theme: Theme) => theme.breakpoints.up('md'),
        { noSsr: true },
    );

    return isDesktop ? <DesktopNavbar /> : <MobileNavbar />;
}
