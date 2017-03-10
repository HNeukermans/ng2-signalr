import { SignalRConnection } from "./signalr.connection";
import { NgZone } from '@angular/core';
import { JConnectionStub, JHubProxyStub } from './jConnection.stub';

describe("Connection", () => {

    it("id should get jConnection-id", () => {        
        let zone = new NgZone(true);
        let jConnectionStub = new JConnectionStub();
        let connection = new SignalRConnection(jConnectionStub, new JHubProxyStub(), zone);
        expect(connection.id).toBe(jConnectionStub.id);
    });
});