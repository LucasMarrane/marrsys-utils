export class ObjectUtils {
    static isObject(object: any) {
        if (object && !Array.isArray(object) &&Object.keys(object).length > 0) {
            return true;
        }

        return false;
    }

    static toTuple(object: any) {
        if (object && this.isObject(object)) {
            return Object.entries(object);
        }

        return null;
    }

    static fromTuple(tuple: any){
        return Object.fromEntries(tuple)
    }

    static removeKey<T extends object = {}>(object: T, key: keyof T){
        const newObject = {...object};
        delete newObject[key];
        return {...newObject}
    }

    static addOrEditKeyValue(object: any, key: string, value: any){
        const newObject = {...object};
        newObject[key] = value;
        return {...newObject}
    }

    static transformProperty<T extends object = {}>(object: T, key: keyof T, transform: any){
        const newObject = {...object};
        newObject[key] = typeof transform ==='function' ? transform(newObject[key] || null) : transform;
        return {...newObject}
    }    
}
