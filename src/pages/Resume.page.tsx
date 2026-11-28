import {
    Box,
    Card,
    CardContent,
    Rating,
    Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { Page } from '../components/Page.component';
import { TagList } from '../components/TagList.component';
import languages from '../data/languages.json';
import skills from '../data/skills.json';
import workExperiences from '../data/work-experiences.json';

const months =
    'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

// Months since year 0 of the first date, e.g. "Aug 2019 - Aug 2020"
function startMonth(period: string) {
    const [month, year] = period.split(/[ ,]+/);

    return Number(year) * 12 + months.indexOf(month);
}

export function Resume() {
    return (
        <Page title="Resume">
            <Section title="Languages">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
                    gap={2}
                >
                    {languages.map((language) => (
                        <Card key={language.name}>
                            <CardContent>
                                <Typography variant="h3">
                                    {language.name}
                                </Typography>
                                <Rating
                                    name={language.name}
                                    value={language.level.number}
                                    precision={0.5}
                                    getLabelText={() =>
                                        language.level.label
                                    }
                                    readOnly
                                    sx={{
                                        my: 1,
                                        color: 'primary.main',
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {language.level.label}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Section>
            <Section title="Skills">
                <TagList tags={skills} />
            </Section>
            <Section title="Working Experiences">
                <Box
                    component="ol"
                    sx={{
                        listStyle: 'none',
                        m: 0,
                        p: 0,
                        pl: 3,
                        borderLeft: 2,
                        borderColor: 'divider',
                    }}
                >
                    {workExperiences
                        .toSorted(
                            (a, b) =>
                                startMonth(b.year) -
                                startMonth(a.year),
                        )
                        .map((workExperience) => (
                            <Experience
                                key={workExperience.year}
                                experience={workExperience}
                            />
                        ))}
                </Box>
            </Section>
        </Page>
    );
}

function Section({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    return (
        <Box component="section" mb={6}>
            <Typography variant="h2" mb={2}>
                {title}
            </Typography>
            {children}
        </Box>
    );
}

function Experience({
    experience,
}: {
    experience: (typeof workExperiences)[number];
}) {
    return (
        <Box
            component="li"
            position="relative"
            mb={3}
            sx={{
                // Dot centered on the timeline border
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -31,
                    top: 24,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                },
            }}
        >
            <Card>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography variant="overline" color="primary">
                        {experience.year}
                    </Typography>
                    <Typography variant="h3">
                        {experience.position}
                    </Typography>
                    <Typography color="text.secondary">
                        {experience.company}
                    </Typography>
                    <Box component="ul" pl={2.5} my={2}>
                        {experience.description.map((description) => (
                            <Typography
                                component="li"
                                variant="body2"
                                key={description}
                                sx={{
                                    'mb': 1,
                                    '&::marker': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {description}
                            </Typography>
                        ))}
                    </Box>
                    <TagList tags={experience.skills} />
                </CardContent>
            </Card>
        </Box>
    );
}
