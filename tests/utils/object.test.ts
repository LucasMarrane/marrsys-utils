import { ObjectUtils } from '../../src/uteis/object';
describe('Test a ObjectUtils class', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        age: 18
    }
    it('Should return if a value passed is an object', async () => {
      const value = ObjectUtils.isObject(user);
      expect(value).toBe(true);
    });

    it('Should return if a value passed is not an object', async () => {
        const value = ObjectUtils.isObject([]);
        expect(value).toBe(false);
    });

    it('Should return a tuple array', async () => {
       const value = ObjectUtils.toTuple(user);
       expect(Array.isArray(value)).toBe(true);
    });

    it('Should return a object', async () => {
        const tuple = ObjectUtils.toTuple(user);
        const value = ObjectUtils.fromTuple(tuple);
        expect(ObjectUtils.isObject(value)).toBe(true);
     });

     it('Should return an object without a property', async () => {
        const value = ObjectUtils.removeKey(user,'name');
        expect(value).not.toHaveProperty('name');
      });    

      it('Should return an object with a custom property', async () => {
        const value = ObjectUtils.addOrEditKeyValue(user,'FullName', 'John Doe');
        expect(value).toHaveProperty('FullName');
      });    

      it('Should return an object with a transformed property', async () => {
        const value = ObjectUtils.transformProperty(user,'age', (age: number)=> age === 18 ? age * 2 : age);
        expect(value).toHaveProperty('age', 18 * 2);
      });    
});
