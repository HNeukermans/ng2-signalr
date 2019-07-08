
import { NgZone } from '@angular/core';
import { JConnectionStub } from './jConnection.stub';
import { SignalRConfiguration } from '../../services/signalr.configuration';
import { ConnectionTransports } from '../../services/connection/connection.transports';
import { SignalR } from '../../services/signalr';

describe('SignalR', () => {

    const configuration = new SignalRConfiguration();
    configuration.url = 'http://localhost:3000';
    configuration.hubName = 'chathub';
    configuration.qs = { user: 'donald' };
    configuration.logging = true;
    configuration.transport = ConnectionTransports.auto;
    const zone = new NgZone({ enableLongStackTrace: true });

    const connection = new JConnectionStub();
    const hubConnectionfn = (url: string) => {
        connection.url = url;
        return connection;
    };

    it('connect should set defaults', () => {

        const signlar = new SignalR(configuration, zone, hubConnectionfn);
        // debugger;
        // signlar.connect().then(() => {
        //     expect(connection.url).toEqual(configuration.url);
        //     expect(connection.hubName).toEqual(configuration.hubName);
        //     expect(connection.qs).toEqual(configuration.qs);
        //     expect(connection.url).toEqual(configuration.url);
        //     expect(connection.transport).toEqual(configuration.transport);
        // });
        // tick();
    });
});


