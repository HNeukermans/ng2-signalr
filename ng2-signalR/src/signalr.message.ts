export class SignalRMessage {
    constructor(public user: string, public content: string) {
        if (user == null || user === "") throw Error("Failed to create SignalRMessage. Argument 'user' can not be null or empty.");
        if (content == null) throw Error("Failed to create SignalRMessage. Argument 'content' can not be null.");
    }
}