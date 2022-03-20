import '../../extensions/string/index'
export class StringUtils{
    static toUpperCase(value: string) {
        return value.toUpperCase();
    }

    static toLowerCase(value: string) {
        return value.toLowerCase();
    }

    static toCamelCase(value: string) {
        return value.toCamelCase();
    }
}