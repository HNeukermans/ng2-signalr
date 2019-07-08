import { ConnectionStatuses } from "ng2-signalr";

describe("ConnectionStatuses", () => {

    it("connecting should have name", () => {
        expect(ConnectionStatuses.connecting.name).toEqual('connecting');
    });

    it("connected should have name", () => {
        expect(ConnectionStatuses.connected.name).toEqual('connected');
    });

    it("reconnecting should have name", () => {
        expect(ConnectionStatuses.reconnecting.name).toEqual('reconnecting');
    });

    it("disconnected should have name", () => {
        expect(ConnectionStatuses.disconnected.name).toEqual('disconnected');
    });

});
