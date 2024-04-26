export function href(href: string) {
    return (import.meta.env.BASE_URL !== "/"
        ? import.meta.env.BASE_URL
        : "") + href
} 