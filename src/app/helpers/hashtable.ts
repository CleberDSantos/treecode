export class BlockIntrinsics {

    public prototype = undefined;
    public toString = undefined;
    public toLocaleString = undefined;
    public valueOf = undefined;
    public hasOwnProperty = undefined;
    public propertyIsEnumerable = undefined;
    public isPrototypeOf = undefined;

    constructor() {
        this["constructor"] = undefined;
    }

}

export interface IHashTable {

    getAllKeys(): string[];
    add(key: string, data): boolean;
    addOrUpdate(key: string, data): boolean;
    map(callback: (k: string, v, c) => void, context): void;
    every(callback: (k: string, v, c) => boolean, context): boolean;
    some(callback: (k: string, v, c) => boolean, context): boolean;
    count(): number;
    lookup(key: string): any;

}

export class HashTable implements IHashTable {

    private itemCount = 0;
    private table = <any>(<any>new BlockIntrinsics());

    public getAllKeys(): string[] {

        var result: string[] = [];

        for (var k in this.table) {

            if (this.table[k] != undefined) {
                result[result.length] = k;
            }

        }

        return result;

    }

    public add(key: string, data): boolean {

        key = key.toLowerCase();

        if (this.table[key] != undefined) {
            return false;
        }

        this.table[key] = data;
        this.itemCount++;
        return true;

    }

    public addOrUpdate(key: string, data): boolean {

        key = key.toLowerCase();

        if (this.table[key] != undefined) {
            this.table[key] = data;
            return false;
        }

        this.table[key] = data;
        this.itemCount++;
        return true;

    }

    public map(callback: (k: string, v, c) => void, context) {

        for (var k in this.table) {

            var data = this.table[k];

            if (data != undefined) {
                callback(k, this.table[k], context);
            }

        }

    }

    public every(callback: (k: string, v, c) => boolean, context) {

        for (var k in this.table) {

            var data = this.table[k];

            if (data != undefined) {

                if (!callback(k, this.table[k], context)) {
                    return false;
                }

            }

        }

        return true;

    }

    public some(callback: (k: string, v, c) => boolean, context) {

        for (var k in this.table) {

            var data = this.table[k];

            if (data != undefined) {

                if (callback(k, this.table[k], context)) {
                    return true;
                }

            }

        }

        return false;

    }

    public count(): number { return this.itemCount; }

    public lookup(key: string) {

        key = key.toLowerCase();
        var data = this.table[key];

        if (data != undefined) {
            return data;
        } else {
            return (null);
        }

    }

}