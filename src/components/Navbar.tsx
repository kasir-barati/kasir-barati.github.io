import {
    Apps as AppsIcon,
    AssignmentInd as AssignmentIndIcon,
    ContactMail as ContactMailIcon,
    FormatBold as FormatBoldIcon,
    Home as HomeIcon,
    MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { PostList } from '../pages/posts/PostList.page';
import { Book } from './Book';
import { Contact } from './Contact';
import { DesktopNavbar } from './DesktopNavbar.component';
import { Home } from './Home';
import { MobileNavbar } from './MobileNavbar.component';
import { Portfolio } from './Portfolio';
import { Resume } from './Resume';

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
        text: 'My Blog',
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
