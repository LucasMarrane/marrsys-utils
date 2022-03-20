import { ObjectUtils } from '../../uteis/object';

type TItemMember = [string, string | Function];

export class MapperGenerator {
    /**
     * Create a mapper object.
     *
     *
     * @param TSource - generic type of origin object
     * @param TDestination - generic type of destination object
     */
    static createDynamicMap<TSource extends object = {}, TDestination extends object = {}>() {
        return new Mapper<TSource, TDestination>();
    }
    /**
     * Create a mapper object.
     *
     *
     * @param TSource - generic type of origin object
     * @param TDestination - generic type of destination object
     */
    static createStaticMap<TSource extends object = {}, TDestination extends object = {}>(objectFrom: TSource, objectTo?: TDestination) {
        return new Mapper<TSource, TDestination>(objectFrom, objectTo);
    }
}

export class Mapper<TSource extends object = {}, TDestination extends object = {}> {
    private _members: MapperMember<TDestination>;
    private _flagDynamic: boolean = false;
    private _ObjectTo: TDestination;
    private _ObjectFrom: TSource;
    constructor(objectFrom?: TSource, objectTo?: TDestination) {
        if (objectFrom) {
            this._ObjectTo = { ...(objectTo || ({} as TDestination)) };
            this._ObjectFrom = { ...objectFrom };
        } else {
            this._members = new MapperMember<TDestination>();
            this._flagDynamic = true;
        }
    }

    /**
     * Add an attribute came from another object into a map.
     *
     *
     * @param to - attribute thats will receive the value
     * @param from - attribute thats will be set to another or callback function
     */
    forField(to: keyof TDestination, from: keyof TSource | ((item?: TSource) => any)) {
        if (this._flagDynamic) {
            this._members.addMember([<string>to, <string | Function>from]);
        } else {
            this._addToDestination(to, from);
        }
        return this;
    }

    /**
     * Add a list of attribute came from another object into a map.
     *
     *
     * @param fields - tupple list that contains from(key of atribute), to(key of atribute) and a callback function
     */
    forFields(fields: [to: keyof TDestination, from: keyof TSource, callback?: (propertyValue?: TSource[keyof TSource], item?: TSource) => any][]) {
        if (this._flagDynamic) {
            this._members.addMembers(fields as unknown as TItemMember[]);
        } else {
            fields.forEach(([to, from]) => this._addToDestination(to, from));
        }
        return this;
    }

    /**
     * remove a field from map.
     *
     *
     * @param destinationField - field that will be removed from map
     */

    removeField(destinationField: keyof TDestination) {
        if (this._flagDynamic) {
            this._members.removeMember(destinationField);
        } else {
            this._removeFromDestination(destinationField);
        }
        return this;
    }

    /**
     * remove a field list from  map.
     *
     *
     * @param destinationField - field that will be removed from map
     */

    removeFields(destinationFields: (keyof TDestination)[]) {
        if (this._flagDynamic) {
            this._members.removeMembers(destinationFields);
        } else {
            destinationFields.forEach((destinationField) => this._removeFromDestination(destinationField));
        }
        return this;
    }

    private _addToDestination(to: keyof TDestination, from: keyof TSource | ((item?: TSource) => any)) {
        const value = typeof from === 'function' ? from(this._ObjectFrom) : (this._ObjectFrom[from] as any);
        this._ObjectTo = ObjectUtils.addOrEditKeyValue(this._ObjectTo, <string>to, value);
    }

    private _removeFromDestination(key: keyof TDestination) {
        this._ObjectTo = ObjectUtils.removeKey<TDestination>(this._ObjectTo, key);
    }

    /**
     * return a mapped object.
     *
     *
     * @param source - object that will be the source of a mapped object;
     * @param destination - An optional object that will be a mapped object, if its null a new object is created;
     */
    map(source?: TSource, destination?: TDestination) {
        let to = {} as TDestination;
        if (this._flagDynamic && source) {
            to = destination || ({} as TDestination);
            const from = source;

            this._members.members.forEach(([keyTo, keyFrom]) => {
                to[<keyof TDestination>keyTo] = typeof keyFrom == 'function' ? keyFrom(from) : from[<keyof TSource>keyFrom];
            });
        } else {
            to = { ...this._ObjectTo };
        }

        return to;
    }
}

class MapperMember<TDestination extends object> {
    private _listMembers: TItemMember[] = new Array();
    public addMember(member: TItemMember) {
        this.removeMember(<keyof TDestination>member[0]);
        this._listMembers.push(member);
    }
    public addMembers(members: TItemMember[]) {
        this.removeMembers(<(keyof TDestination)[]>members.map((member) => member[0]));
        this._listMembers = [...this._listMembers.concat(members)];
    }

    public removeMembers(properties: (keyof TDestination)[]) {
        this._listMembers = [...this._listMembers.filter(([destination]) => !properties.includes(<keyof TDestination>destination))];
    }
    public removeMember(property: keyof TDestination) {
        this._listMembers = [...this._listMembers.filter(([destination]) => property !== destination)];
    }

    get members() {
        return this._listMembers;
    }
}
