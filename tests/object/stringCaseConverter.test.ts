import { StringCaseConverter } from '../../src/object/stringCaseConverter/index';

interface IUser {
    fullName: string;
    isUnder18: boolean;
}

describe('Create a static string text case', () => {
    const user: IUser = {
        fullName: 'john doe',
        isUnder18: true,
    };

    it('Should return a object that contains a key with value in Camel Case / Pascal Case ', async () => {
        const mapped = StringCaseConverter.createStaticConverter<IUser>(user, 'camel').where('fullName').getObject();
        expect(mapped).toHaveProperty('fullName', 'John Doe');
    });

    it('Should return a object that contains a key with value in Lower Case', async () => {
        const mapped = StringCaseConverter.createStaticConverter<IUser>(user, 'lower').where('fullName').getObject();
        expect(mapped).toHaveProperty('fullName', 'john doe');
    });

    it('Should return a object that contains a key with value in Upper Case', async () => {
        const mapped = StringCaseConverter.createStaticConverter<IUser>(user, 'upper').where('fullName').getObject();
        expect(mapped).toHaveProperty('fullName', 'JOHN DOE');
    });
});
