import { ConnectionTransports } from "ng2-signalr";

describe("ConnectionTransports", () => {

    it("auto should have name", () => {
        expect(ConnectionTransports.auto.name).toEqual('auto');
    });

    it("foreverFrame should have name", () => {
        expect(ConnectionTransports.foreverFrame.name).toEqual('foreverFrame');
    });

    it("longPolling should have name", () => {
        expect(ConnectionTransports.longPolling.name).toEqual('longPolling');
    });

    it("serverSentEvents should have name", () => {
        expect(ConnectionTransports.serverSentEvents.name).toEqual('serverSentEvents');
    });

    it("webSockets should have name", () => {
        expect(ConnectionTransports.webSockets.name).toEqual('webSockets');
    });

});
