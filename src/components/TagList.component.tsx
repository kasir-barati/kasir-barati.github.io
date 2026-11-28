import { Chip, Stack } from '@mui/material';

export function TagList({ tags }: { tags: string[] }) {
    return (
        <Stack
            direction="row"
            useFlexGap
            spacing={1}
            sx={{ flexWrap: 'wrap' }}
        >
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                />
            ))}
        </Stack>
    );
}
