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
import projects from '../data/projects.json';

type Project = (typeof projects)[number];

export function Portfolio() {
    const standaloneProjects = projects.filter(
        (project) => !project.org,
    );
    const orgs = [
        ...new Set(
            projects
                .map((project) => project.org)
                .filter((org): org is string => Boolean(org)),
        ),
    ];

    return (
        <Box
            component="div"
            bgcolor="rgba(34, 51, 51, 0.95)"
            minHeight="100vh"
            sx={{ py: 6, px: { xs: 2, md: 4 } }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                {/* Organizations Sections */}
                {orgs.map((org) => (
                    <Box
                        key={org}
                        mb={6}
                        sx={{
                            bgcolor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: 4,
                            padding: { xs: 2, md: 4 },
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="a"
                            href={`https://github.com/${org}`}
                            target="_blank"
                            sx={{
                                'color': 'white',
                                'textDecoration': 'none',
                                'fontWeight': 'bold',
                                'display': 'inline-block',
                                'mb': 4,
                                '&:hover': { color: 'primary.light' },
                            }}
                        >
                            {org}
                        </Typography>

                        <Grid container spacing={4}>
                            {projects
                                .filter(
                                    (project) => project.org === org,
                                )
                                .map((project) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={project.name}
                                    >
                                        <ProjectCard
                                            project={project}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                ))}

                {/* Standalone Projects Section */}
                {standaloneProjects.length > 0 && (
                    <Box mb={8}>
                        <Typography
                            variant="h4"
                            color="white"
                            fontWeight="bold"
                            mb={4}
                        >
                            Featured Projects
                        </Typography>
                        <Grid container spacing={4}>
                            {standaloneProjects.map((project) => (
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
                )}
            </Box>
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
                        {project.name.trim()}
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
