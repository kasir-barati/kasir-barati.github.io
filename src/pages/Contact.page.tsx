import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { DevToIcon } from '../components/DevtoIcon.component';

const socialLinks = [
    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kasir-barati/',
        icon: <LinkedInIcon />,
    },
    {
        title: 'GitHub',
        href: 'https://github.com/kasir-barati/',
        icon: <GitHubIcon />,
    },
    {
        title: 'Email',
        href: 'mailto:kasir.barati@gmail.com',
        icon: <AlternateEmailIcon />,
    },
    {
        title: 'Reddit',
        href: 'https://www.reddit.com/user/m-jawad-b-khorasani',
        icon: <RedditIcon />,
    },
    {
        title: 'X',
        href: 'https://x.com/kasir_barati',
        icon: <XIcon />,
    },
    {
        title: 'Facebook',
        href: 'https://www.facebook.com/kasirbarati',
        icon: <FacebookIcon />,
    },
    {
        title: 'Instagram',
        href: 'https://www.instagram.com/node.js.developers.kh/',
        icon: <InstagramIcon />,
    },
    {
        title: 'Dev.to',
        href: 'https://dev.to/kasir-barati',
        icon: <DevToIcon />,
    }, // New Dev.to link
];

export function Contact() {
    return (
        <Box
            bgcolor="rgba(34, 51, 51, 0.8)"
            display="flex"
            justifyContent="center"
            alignItems="center" // Centers the icons vertically if this is a full page overlay
            height="100%"
        >
            <Stack
                direction="row"
                component="div"
                justifyContent="center"
                alignItems="center"
                spacing={{ xs: 1, sm: 2 }} // Tighter spacing on mobile
                flexWrap="wrap"
                useFlexGap
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle glassmorphism background
                    backdropFilter: 'blur(8px)',
                    borderRadius: 4,
                    padding: 2,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '90vw', // Prevents overflow on mobile
                }}
            >
                {socialLinks.map((link) => (
                    <Tooltip
                        key={link.title}
                        title={link.title}
                        arrow
                    >
                        <IconButton
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                'color': '#e0e0e0', // Light gray base color
                                'transition': 'all 0.2s ease-in-out',
                                '&:hover': {
                                    color: '#4caf50', // Your green color on hover
                                    transform: 'translateY(-3px)', // Slight lift effect
                                    backgroundColor:
                                        'rgba(76, 175, 80, 0.1)',
                                },
                            }}
                        >
                            {link.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Stack>
        </Box>
    );
}
