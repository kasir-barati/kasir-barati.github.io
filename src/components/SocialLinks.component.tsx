import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { DevToIcon } from './DevtoIcon.component';

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
    },
];

export function SocialLinks() {
    return (
        <Stack
            direction={{ xs: 'row', sm: 'column' }}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 1.5 }}
            flexWrap="wrap"
            useFlexGap
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                borderRadius: 4,
                padding: { xs: 1, sm: 1.5 },
                border: '1px solid rgba(255, 255, 255, 0.1)',
                maxWidth: '90vw',
            }}
        >
            {socialLinks.map((link) => (
                <Tooltip
                    key={link.title}
                    title={link.title}
                    arrow
                    placement="left"
                >
                    <IconButton
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.title}
                        sx={{
                            'color': '#e0e0e0',
                            'transition': 'all 0.2s ease-in-out',
                            '&:hover': {
                                color: '#4caf50',
                                transform: 'translateY(-3px)',
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
    );
}
