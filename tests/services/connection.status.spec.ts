import { ConnectionStatus } from '../../src/services/connection/connection.status';
describe("ConnectionStatus", () => {

    it("constructor should set name", () => {
        let status = new ConnectionStatus("connected");
        expect(status.name).toBe("connected");
    });

    it("toString() should be name", () => {
        let event = new ConnectionStatus("connected");
        expect(event.toString()).toBe(event.name);
    });

    it("equal should compare names", () => {
        let status1 = new ConnectionStatus("connected");
        let status2 = new ConnectionStatus("connected");
        let status3 = new ConnectionStatus("starting");
        expect(status1.equals(status2)).toBe(true);
        expect(status1.equals(status3)).toBe(false);
    });

    it("constructor should throw when name is null", () => {
        let action = () => new ConnectionStatus(null);
        expect(action).toThrow();
    });

    it("constructor should throw when name is empty", () => {
        let action = () => new ConnectionStatus("");
        expect(action).toThrow();
    });

});
