import { Mapper, MapperGenerator } from '../../src/object/mapperGenerator/index';

interface IUserMapped {
    fullName: string;
    isUnder18: boolean;
}
interface IUser {
    name: string;
    surname: string;
    age: number;
}

describe('Create a dynamic map', () => { 
   
    it('Should return a mapped object (with a full name and cast age to boolean if its under or not 18 years old)', async () => {
        const user: IUser = {
            name: 'John',
            surname: 'Doe',
            age: 35,
        };
        const mapped = MapperGenerator.createDynamicMap<IUser, IUserMapped>()
            .forField('fullName', (user) => `${user?.name} ${user?.surname}`)
            .forField('isUnder18', (user) => (user?.age && user.age > 18 ? false : true))
            .map(user);
        expect(mapped).toHaveProperty('isUnder18', false)
        expect(mapped).toHaveProperty('fullName', 'John Doe');
    });

    it('Should return a mapper instance because not calls map function', async () => {
        const mapped = MapperGenerator.createDynamicMap<IUser, IUserMapped>()
            .forField('fullName', (user) => `${user?.name} ${user?.surname}`)
            .forField('isUnder18', (user) => (user?.age && user.age > 18 ? false : true));
        expect(mapped).not.toHaveProperty('isUnder18', false)
        expect(mapped).not.toHaveProperty('fullName', 'John Doe');
        expect(mapped).toBeInstanceOf(Mapper)
    });
});

describe('Create a static map', () => { 
   
    it('Should return a mapped object (with a full name and cast age to boolean if its under or not 18 years old)', async () => {
        const user: IUser = {
            name: 'John',
            surname: 'Doe',
            age: 35,
        };
        const mapped = MapperGenerator.createStaticMap<IUser, IUserMapped>(user)
            .forField('fullName', (user) => `${user?.name} ${user?.surname}`)
            .forField('isUnder18', (user) => (user?.age && user.age > 18 ? false : true))
            .map();
        expect(mapped).toHaveProperty('isUnder18', false)
        expect(mapped).toHaveProperty('fullName', 'John Doe');
    });

    it('Should return a mapper instance because not calls map function', async () => {
        const user: IUser = {
            name: 'John',
            surname: 'Doe',
            age: 35,
        };
        const mapped = MapperGenerator.createStaticMap<IUser, IUserMapped>(user)
            .forField('fullName', (user) => `${user?.name} ${user?.surname}`)
            .forField('isUnder18', (user) => (user?.age && user.age > 18 ? false : true));
        expect(mapped).not.toHaveProperty('isUnder18', false)
        expect(mapped).not.toHaveProperty('fullName', 'John Doe');
        expect(mapped).toBeInstanceOf(Mapper)
    });
});
