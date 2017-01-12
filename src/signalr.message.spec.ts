import { SignalRMessage } from "./signalr.message";

describe("SignalRMessage", () => {

    it("constructor should set properties", () => {
        let message = new SignalRMessage("hannes", "this is a message");
        expect(message.user).toBe("hannes");
        expect(message.content).toBe("this is a message");
    });

    it("constructor should throw when user is null or empty", () => {
        let action = () => new SignalRMessage("", "this is a message");
        expect(action).toThrow();
        action = () => new SignalRMessage(null, "this is a message");
        expect(action).toThrow();
    });

    it("constructor should throw when message is null", () => {
        let action = () => new SignalRMessage("hannes", null);
        expect(action).toThrow();
    });

    it("constructor should allow message to be empty", () => {
        let message = new SignalRMessage("hannes", "");
        expect(message.content).toBe("");
    });
});