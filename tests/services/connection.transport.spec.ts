import { ConnectionTransport } from '../../src/services/connection/connection.transport';
describe("ConnectionTransport", () => {

    it("constructor should set name", () => {
        let transport = new ConnectionTransport("auto");
        expect(transport.name).toBe("auto");
    });

    it("toString() should be name", () => {
        let transport = new ConnectionTransport("auto");
        expect(transport.toString()).toBe(transport.name);
    });

    it("equal should compare names", () => {
        let transport1 = new ConnectionTransport("auto");
        let transport2 = new ConnectionTransport("auto");
        let transport3 = new ConnectionTransport("longPolling");
        expect(transport1.equals(transport2)).toBe(true);
        expect(transport1.equals(transport3)).toBe(false);
    });

    it("constructor should throw when name is null", () => {
        let transport = () => new ConnectionTransport(null);
        expect(transport).toThrow();
    });

    it("constructor should throw when name is empty", () => {
        let transport = () => new ConnectionTransport("");
        expect(transport).toThrow();
    });

});
