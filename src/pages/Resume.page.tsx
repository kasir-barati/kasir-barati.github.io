import CircleIcon from '@mui/icons-material/Circle';
import {
    Avatar,
    Box,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Rating,
    SxProps,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import languages from '../data/languages.json';
import skills from '../data/skills.json';
import workExperiences from '../data/work-experiences.json';

export function Resume() {
    const theme = useTheme();
    const headSx: SxProps<Theme> = {
        alignContent: 'center',
        textTransform: 'uppercase',
        padding: '3rem 0',
    };
    const timelineSx: SxProps<Theme> = {
        'position': 'relative',
        'padding': '1rem',
        'margin': '0 auto',
        '&:before': {
            content: "''",
            position: 'absolute',
            height: '100%',
            borderLeft: '1px solid blue',
            right: '40px',
            top: 0,
        },
        '&:after': {
            content: "''",
            display: 'table',
            clear: 'both',
        },
        [theme.breakpoints.up('md')]: {
            'padding': '2rem',
            '&:before': {
                left: 'calc(50% - 1px)',
                right: 'auto',
            },
        },
    };
    const timelineYearSx: SxProps<Theme> = {
        'textAlign': 'center',
        'margin': '0 3rem 0 auto',
        'fontSize': '1.8rem',
        'color': '#fff',
        'background': 'tomato',
        'lineHeight': 1,
        'padding': '0.5rem 1rem',
        '&:before': {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            'textAlign': 'center',
            'margin': '0 auto',
            '&:nth-of-type(2n)': {
                float: 'none',
                margin: '0 auto',
            },
            '&:nth-of-type(2n):before': {
                display: 'none',
            },
        },
    };
    const halfArrowItemSx: SxProps<Theme> = {
        'padding': '1rem',
        'position': 'relative',
        'margin': '1rem 3rem 1rem 1rem',
        'clear': 'both',
        '&:after': {
            content: "''",
            position: 'absolute',
        },
        '&:before': {
            content: "''",
            position: 'absolute',
            right: '-0.625rem',
            top: 'calc(50% - 5px)',
            borderStyle: 'solid',
            borderColor: 'red red transparent transparent',
            borderWidth: '0.625rem',
            transform: 'rotate(45deg)',
        },
        [theme.breakpoints.up('md')]: {
            'width': '44%',
            'margin': '1rem',
            '&:nth-of-type(2n)': {
                float: 'right',
                margin: '1rem',
                borderColor: 'tan',
            },
            '&:nth-of-type(2n):before': {
                right: 'auto',
                left: '-0.625rem',
                borderColor: 'transparent transparent red red',
            },
        },
    };
    const timelineItemSx: SxProps<Theme> = {
        'padding': '1rem',
        'borderBottom': '2px solid tan',
        'position': 'relative',
        'margin': '1rem 3rem 1rem 1rem',
        'clear': 'both',
        '&:after': {
            content: "''",
            position: 'absolute',
        },
        '&:before': {
            content: "''",
            position: 'absolute',
            right: '-0.625rem',
            top: 'calc(50% - 5px)',
            transform: 'rotate(45deg)',
        },
        [theme.breakpoints.up('md')]: {
            'width': '44%',
            'margin': '1rem',
            '&:nth-of-type(2n)': {
                float: 'right',
                margin: '1rem',
                borderColor: 'tan',
            },
            '&:nth-of-type(2n):before': {
                right: 'auto',
                left: '-0.625rem',
            },
        },
    };
    const subHeadSx: SxProps<Theme> = {
        color: '#fff',
        padding: 0,
        textTransform: 'uppercase',
    };

    return (
        <Box
            component="section"
            textAlign="center"
            bgcolor="rgba(34, 51, 51, 0.8)"
        >
            <Typography variant="h4" sx={headSx}>
                Languages
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {languages.map((language) => (
                    <Grid
                        item
                        bgcolor={
                            theme.palette.mode === 'dark'
                                ? '#222'
                                : '#fff'
                        }
                        borderRadius={7}
                        padding={3}
                        margin={1}
                    >
                        <Typography variant="body1">
                            {language.name}
                        </Typography>
                        <Rating
                            name={language.name}
                            value={language.level.number}
                            precision={0.5}
                            getLabelText={() => language.level.label}
                            readOnly={true}
                        />
                        <Typography variant="body1">
                            {language.level.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" sx={headSx}>
                Skills
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {skills.map((skill) => (
                    <Grid item>
                        <Paper
                            sx={{
                                padding: 1,
                            }}
                        >
                            {skill}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" sx={headSx}>
                Working Experiences
            </Typography>
            <Box component="div" sx={timelineSx}>
                {workExperiences.map((workExperience) => {
                    return (
                        <>
                            <Typography
                                variant="h2"
                                sx={{
                                    ...timelineYearSx,
                                    ...timelineItemSx,
                                }}
                            >
                                {workExperience.year}
                            </Typography>
                            <Box
                                component="div"
                                sx={{
                                    ...timelineItemSx,
                                    ...halfArrowItemSx,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    sx={subHeadSx}
                                >
                                    {workExperience.position}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    align="center"
                                    color="tomato"
                                >
                                    {workExperience.company}
                                </Typography>
                                <List dense={true}>
                                    {workExperience.description.map(
                                        (description) => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <CircleIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography
                                                        variant="subtitle1"
                                                        align="justify"
                                                        color="tan"
                                                    >
                                                        {description}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        ),
                                    )}
                                </List>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color="white"
                                >
                                    {workExperience.skills.map(
                                        (skill, index) => (
                                            <>
                                                {skill}{' '}
                                                {index !==
                                                    workExperience
                                                        .skills
                                                        .length -
                                                        1 && ' . '}
                                            </>
                                        ),
                                    )}
                                </Typography>
                            </Box>
                        </>
                    );
                })}
            </Box>
        </Box>
    );
}
