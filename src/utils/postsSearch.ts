interface Post {
    id: string;
    title: string;
    description: string;
    href: string;
    imageSrc: string;
    tags: string[];
}

const bodyTextCache = new Map<string, string>();

function isLocalPost(post: Post): boolean {
    return post.href.startsWith('./') || post.href.startsWith('/');
}

function stripHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .toLowerCase();
}

function matchesMetadata(post: Post, query: string): boolean {
    return (
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
}

async function matchesBody(post: Post, query: string): Promise<boolean> {
    if (!isLocalPost(post)) {
        return false;
    }

    let bodyText = bodyTextCache.get(post.href);

    if (bodyText === undefined) {
        const response = await fetch(post.href);
        const html = await response.text();

        bodyText = stripHtml(html);
        bodyTextCache.set(post.href, bodyText);
    }

    return bodyText.includes(query);
}

export async function searchPosts(
    posts: Post[],
    query: string,
): Promise<Post[]> {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
        return posts;
    }

    const matches = await Promise.all(
        posts.map(async (post): Promise<Post | null> => {
            if (matchesMetadata(post, trimmedQuery)) {
                return post;
            }

            return (await matchesBody(post, trimmedQuery))
                ? post
                : null;
        }),
    );

    return matches.filter((post): post is Post => post !== null);
}
