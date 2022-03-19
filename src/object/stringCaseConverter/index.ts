import { toCamelCase, toLowerCase, toUpperCase } from "../../uteis/string";

type TTextCase = 'camel' | 'lower' | 'upper';
type TCaseConverter = Record<TTextCase, Function>;
export class StringCaseConverter {
     /**
     * Create a new instance of a converter with predefined functions
     *
     *
     * @param object - TObject - object that'll be change.
     * @param textCase - TTextCase - type of function.
     */
    static createStaticConverter<TObject extends object = {}>(object: TObject, textCase: TTextCase) {
        return new StringConverter<TObject>(object, this._caseConverter[textCase], this._caseConverter);
    }

     /**
     * Create a new instance of a converter with another transform functions
     *
     *
     * @param object - TObject - object that'll be change.
     * @param converter - Function - function converter.
     */
    static createDynamicConverter<TObject extends object = {}>(object: TObject, converter: Function) {
        return new StringConverter<TObject>(object, converter);
    }

    private static _caseConverter: TCaseConverter = {
        camel: toCamelCase,
        lower: toLowerCase,
        upper: toUpperCase,
    };    
}

export class StringConverter<TObject extends object = {}> {
    private _objectTransform: TObject;
    private _transformFunction: Function;
    private _transformFunctions: TCaseConverter;
    constructor(object: TObject, transformFunction: Function, transformFunctions?: TCaseConverter) {
        this._objectTransform = object;
        this._transformFunction = transformFunction;
        if (transformFunctions) {
            this._transformFunctions = transformFunctions;
        }
    }

    /**
     * Change a transform function
     *
     *
     * @param functionTransformCase - predefined function or new function for transform text case.
     */
    changeTransformFunction(functionTransformCase: TTextCase | Function) {
        const functionTransform =
            typeof functionTransformCase === 'function' ? functionTransformCase : this._transformFunctions[functionTransformCase];
        this._transformFunction = functionTransform;
        return this;
    }

    /**
     * Filter all fields where type of is string
     *
     *
     * @param isString - change where type of values is string.
     */
    where(isString: boolean): this;
    /**
     * Change text case for specific field
     *
     *
     * @param field - key that'll be change.
     */
    where(field: keyof TObject): this;
    /**
     * Change text case for specifics fields
     *
     *
     * @param fields - keys that'll be change.
     */
    where(fields: (keyof TObject)[]): this;
    where(...args: any[]) {
        if (args.length === 1) {
            if (typeof args[0] === 'boolean') {
                const entries = Object.entries(this._objectTransform || {}).map(([key, value]) => [
                    key,
                    typeof value === 'string' ? this._transformFunction(value) : value,
                ]);
                this._objectTransform = Object.fromEntries(entries);
            } else if (typeof args[0] === 'string') {
                if (typeof this._objectTransform[<keyof TObject>args[0]] === 'string') {
                    this._transformField(<keyof TObject>args[0]);
                }
            } else if (Array.isArray(args[0])) {
                args[0].forEach((item) => {
                    this._transformField(item);
                });
            }
        }
        return this;
    }

    private _transformField(key: keyof TObject) {
        const value = this._objectTransform[<keyof TObject>key] as unknown as string;
        this._objectTransform[<keyof TObject>key] = this._transformFunction(value) as any;
    }
    /**
     * Get object converted
     *
     *
     */
    getObject() {
        return { ...this._objectTransform } as TObject;
    }
}
