import { Chip, Stack } from '@mui/material';

export function TagList({ tags }: { tags: string[] }) {
    return (
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
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
