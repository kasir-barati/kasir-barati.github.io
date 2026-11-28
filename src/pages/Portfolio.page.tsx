import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from '@mui/material';
import { Page } from '../components/Page.component';
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
        <Page title="Portfolio">
            {groups.map((group) => (
                <ProjectGroup key={group.name} group={group} />
            ))}
        </Page>
    );
}

function ProjectGroup({ group }: { group: Group }) {
    return (
        <Box component="section" sx={{ mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 1 }}>
                {group.type === 'org' ? (
                    <Link
                        href={`https://github.com/${group.name}`}
                        target="_blank"
                        color="inherit"
                        underline="hover"
                    >
                        {group.name}
                    </Link>
                ) : (
                    group.name
                )}
            </Typography>
            {group.description && (
                <Typography color="textSecondary">
                    {group.description}
                </Typography>
            )}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 2,
                    mt: 2,
                }}
            >
                {group.projects.map((project) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                    />
                ))}
            </Box>
        </Box>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h3" sx={{ mb: 1 }}>
                    {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {project.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                {project.links.map((link) => (
                    <Button
                        variant="contained"
                        target="_blank"
                        href={link.address}
                        key={link.address}
                    >
                        {link.buttonName}
                    </Button>
                ))}
            </CardActions>
        </Card>
    );
}
