export function toUpperCase(value: string) {
    return value.toUpperCase();
}
export function  toLowerCase(value: string) {
    return value.toLowerCase();
}
export function  toCamelCase(value: string) {
    return value
        .split(' ')
        .map((word) => word[0].toUpperCase().concat(word.toLowerCase().slice(1)))
        .join(' ');
}