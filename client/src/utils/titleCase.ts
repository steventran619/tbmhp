export function titleCase(word: string) {
    return word.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}