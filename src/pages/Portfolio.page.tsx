import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import data from '../data/projects.json';

type Group = (typeof groups)[number];
type Project = Group['projects'][number];

const groups = data as Array<{
    type: 'org' | 'other';
    name: string;
    description: string | null;
    projects: Array<{
        name: string;
        alt: string;
        description: string;
        links: Array<{ buttonName: string; address: string }>;
    }>;
}>;

export function Portfolio() {
    return (
        <Box
            component="div"
            bgcolor="rgba(34, 51, 51, 0.95)"
            minHeight="100vh"
            sx={{ py: 6, px: { xs: 2, md: 4 } }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                {groups.map((group) => (
                    <ProjectGroup key={group.name} group={group} />
                ))}
            </Box>
        </Box>
    );
}

function ProjectGroup({ group }: { group: Group }) {
    const isOrg = group.type === 'org';

    return (
        <Box
            mb={isOrg ? 6 : 8}
            sx={{
                padding: { xs: 2, md: 4 },
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                ...(isOrg && {
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                }),
            }}
        >
            <Typography
                variant="h4"
                {...(isOrg && {
                    component: 'a',
                    href: `https://github.com/${group.name}`,
                    target: '_blank',
                })}
                sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    mb: group.description ? 1 : 4,
                    ...(isOrg && {
                        '&:hover': { color: 'primary.light' },
                    }),
                }}
            >
                {group.name}
            </Typography>
            {group.description && (
                <Typography color="text.secondary" mb={4}>
                    {group.description}
                </Typography>
            )}
            <Grid container spacing={4}>
                {group.projects.map((project) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={project.name}
                    >
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Card
            sx={{
                'height': '100%',
                'display': 'flex',
                'flexDirection': 'column',
                'borderRadius': 2,
                'bgcolor': 'rgba(255, 255, 255, 0.05)',
                'backdropFilter': 'blur(10px)',
                'border': '1px solid rgba(255, 255, 255, 0.1)',
                'transition':
                    'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
            }}
        >
            {/* Replaced CardActionArea with Box */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                    >
                        {project.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {project.description}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions
                sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}
            >
                {project.links.map((link) => (
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        disableElevation
                        target="_blank"
                        href={link.address}
                        key={link.address}
                        sx={{
                            borderRadius: 4,
                            textTransform: 'none',
                        }}
                    >
                        {link.buttonName}
                    </Button>
                ))}
            </CardActions>
        </Card>
    );
}
