export function localDateTimeToDate(eventDateTime: string) {
    const date = new Date(eventDateTime);
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
}