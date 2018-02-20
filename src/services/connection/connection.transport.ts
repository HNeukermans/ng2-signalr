export class ConnectionTransport {

    private _name: string;

    get name(): string {
        return this._name;
    }

    constructor(name: string) {
        if (name == null || name === "") {
            throw new Error("Failed to create ConnectionTransport. Argument 'name' can not be null or empty.");
        }
        this._name = name;
    }

    public toString(): string {
        return this._name;
    }

    public equals(other: ConnectionTransport): boolean {
        if (other == null) {
            return false;
        }

        return this._name === other.name;
    }
}
