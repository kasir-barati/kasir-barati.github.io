import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { AtSignIcon } from 'lucide-react';
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
        icon: <AtSignIcon />,
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
            direction="row"
            useFlexGap
            spacing={0.5}
            sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
        >
            {socialLinks.map((link) => (
                <Tooltip key={link.title} title={link.title} arrow>
                    <IconButton
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.title}
                        sx={{
                            '&:hover': { color: 'primary.main' },
                        }}
                    >
                        {link.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Stack>
    );
}
