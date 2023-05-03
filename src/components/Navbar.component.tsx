import {
    Apps as AppsIcon,
    AssignmentInd as AssignmentIndIcon,
    ContactMail as ContactMailIcon,
    FormatBold as FormatBoldIcon,
    Home as HomeIcon,
    MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { Book } from '../pages/Book.page';
import { Contact } from '../pages/Contact.page';
import { Home } from '../pages/Home.page';
import { Portfolio } from '../pages/Portfolio.page';
import { PostList } from '../pages/PostList.page';
import { Resume } from '../pages/Resume.page';
import { DesktopNavbar } from './DesktopNavbar.component';
import { MobileNavbar } from './MobileNavbar.component';

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
    {
        icon: <FormatBoldIcon />,
        text: 'My Posts',
        href: '/posts',
        component: <PostList />,
    },
];

export function Navbar() {
    const minWidth600px = useMediaQuery('(min-width:600px)');

    return (
        <>{minWidth600px ? <DesktopNavbar /> : <MobileNavbar />}</>
    );
}
