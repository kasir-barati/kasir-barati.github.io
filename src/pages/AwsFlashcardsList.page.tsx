import { Masonry } from '@mui/lab';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from '@mui/material';
import flashcards from '../data/aws-flashcards.json';
import { getRandomColor } from '../utils/genRandomColor';
import { CopyToClipboardButton } from '../components/CopyToClipboardButton.component';

export function AwsFlashcardsList() {
    return (
        <Box padding={2}>
            <Masonry
                columns={{ xs: 1, sm: 2, md: 3 }}
                spacing={2}
                sx={{ mt: 1 }}
            >
                {flashcards.map((flashcard) => (
                    <Card key={flashcard.id}>
                        <CardContent>
                            <Typography
                                color={getRandomColor()}
                                variant="h5"
                                gutterBottom
                            >
                                {flashcard.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                textAlign="justify"
                                mt={1}
                                mb={2}
                            >
                                {flashcard.description}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="center"
                                color="white"
                            >
                                {flashcard.tags.map((tag, index) => (
                                    <>
                                        {tag}{' '}
                                        {index !==
                                            flashcard.tags.length -
                                                1 && ' . '}
                                    </>
                                ))}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="success"
                                href={flashcard.href}
                            >
                                View flashcard
                            </Button>
                            <CopyToClipboardButton
                                variant="contained"
                                color="primary"
                                url={flashcard.href}
                            >
                                Share
                            </CopyToClipboardButton>
                        </CardActions>
                    </Card>
                ))}
            </Masonry>
        </Box>
    );
}
