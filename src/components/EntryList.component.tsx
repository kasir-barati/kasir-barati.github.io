import { Masonry } from '@mui/lab';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { CopyToClipboardButton } from './CopyToClipboardButton.component';
import { TagList } from './TagList.component';

interface Entry {
    id: string;
    title: string;
    description: string;
    href: string;
    tags: string[];
}

export function EntryList({
    entries,
    actionLabel,
}: {
    entries: Entry[];
    actionLabel: string;
}) {
    return (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            {entries.map((entry) => (
                <Card key={entry.id}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{ mb: 1 }}
                        >
                            {entry.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 2 }}
                        >
                            {entry.description}
                        </Typography>
                        <TagList tags={entry.tags} />
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                        <Button variant="contained" href={entry.href}>
                            {actionLabel}
                        </Button>
                        <CopyToClipboardButton url={entry.href}>
                            Share
                        </CopyToClipboardButton>
                    </CardActions>
                </Card>
            ))}
        </Masonry>
    );
}
