import { BroadcastEventListener } from "./broadcast.event.listener";

describe("BroadcastEventListener", () => {

    interface Type {}

    it("constructor should set event", () => {
        let l = new BroadcastEventListener<Type>("UserConnected");
       expect(l.event).toBe("UserConnected");
    });

    it("constructor should throw when event is null", () => {
        let action = () => new BroadcastEventListener<Type>(null);
        expect(action).toThrow();
    });

    it("constructor should throw when event is empty", () => {
        let action = () => new BroadcastEventListener<Type>("");
        expect(action).toThrow();
    });

});
