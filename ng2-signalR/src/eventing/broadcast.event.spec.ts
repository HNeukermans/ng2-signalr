import { BroadcastEvent } from "./broadcast.event";

describe("BroadcastEvent", () => {

    it("constructor should set name", () => {
        let event = new BroadcastEvent("hannes");
        expect(event.name).toBe("hannes");
    });

    it("toString() should be name", () => {
        let event = new BroadcastEvent("hannes");
        expect(event.toString()).toBe("hannes");
    });

    it("equal should compare names", () => {
        let event1 = new BroadcastEvent("hannes");
        let event2 = new BroadcastEvent("hannes");
        let event3 = new BroadcastEvent("frederik");
        expect(event1.equals(event2)).toBe(true);
        expect(event1.equals(event3)).toBe(false);
    });

    it("constructor should throw when name is null", () => {
        let action = () => new BroadcastEvent(null);
        expect(action).toThrow();
    });

    it("constructor should throw when name is empty", () => {
        let action = () => new BroadcastEvent("");
        expect(action).toThrow();
    });

});