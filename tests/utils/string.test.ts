import { StringUtils } from '../../src/uteis/string';
describe('Test a StringUtils class', () => {
    it('Should return a upper cased string', async () => {
        const value = StringUtils.toUpperCase('john doe');
        expect(value).toBe('JOHN DOE');
    });

    it('Should return a lower cased string', async () => {
        const value = StringUtils.toLowerCase('jOhn doE');
        expect(value).toBe('john doe');
    });

    it('Should return a camel cased string', async () => {
        const value = StringUtils.toCamelCase('joHN doE');
        expect(value).toBe('John Doe');
    });
});
