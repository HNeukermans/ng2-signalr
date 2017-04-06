import { ConnectionStatuses } from '../../src/services/connection/connection.statuses';
describe("ConnectionStatuses", () => {

    it("starting should have name", () => {
        expect(ConnectionStatuses.starting.name).toEqual('starting');
    });

    it("connectionSlow should have name", () => {
        expect(ConnectionStatuses.connectionSlow.name).toEqual('connectionSlow');
    });

    it("received should have name", () => {
        expect(ConnectionStatuses.received.name).toEqual('received');
    });

    it("received should have name", () => {
        expect(ConnectionStatuses.disconnected.name).toEqual('disconnected');
    });

    it("reconnected should have name", () => {
        expect(ConnectionStatuses.reconnected.name).toEqual('reconnected');
    });

    it("reconnecting should have name", () => {
        expect(ConnectionStatuses.reconnecting.name).toEqual('reconnecting');
    });

    it("stateChanged should have name", () => {
        expect(ConnectionStatuses.stateChanged.name).toEqual('stateChanged');
    });


});
