export class ConnectionStatus {

    private static names: string[] = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];

    private _value: number;

    get value(): number {
        return this._value;
    }

     get name(): string {
        return ConnectionStatus.names[Number.parseInt(this._value.toString())];
    }

    constructor(value: number) {
        if (value == null || value < 0) {
            throw new Error("Failed to create ConnectionStatus. Argument 'name' can not be null or empty.");
        }
        this._value = value;
    }

    public toString(): string {
        return this.name;
    }

    public equals(other: ConnectionStatus): boolean {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    }
}
