/**
 * Formats a date string or Date object into a localized date string.
 * @param date - The date string or Date object to format.
 * @returns A localized date string in the format "Month Day, Year".
 */
export function formatDate(date: string | Date): string {
    const formattedDate = new Date(date);
    // Append 'T00:00:00' if the date is a string without time
    if (typeof date === 'string' && !date.includes('T')) {
        return new Date(date + 'T00:00:00').toLocaleDateString(
            'en-US',
            {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            },
        );
    }
    return formattedDate.toLocaleDateString(undefined, {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
