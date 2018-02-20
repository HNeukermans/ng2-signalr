
import { NgZone } from '@angular/core';
import { SignalRConfiguration, ConnectionTransports, ConnectionTransport, SignalR } from "../../index";
import { JConnectionStub } from "./jConnection.stub";
//import {  fakeAsync, tick } from '@angular/core/testing';

describe('SignalR', () => {

    let configuration = new SignalRConfiguration();
    configuration.url = 'http://localhost:3000';
    configuration.hubName = 'chathub';
    configuration.qs = { user: 'donald' };
    configuration.logging = true;
    configuration.transport = ConnectionTransports.auto;
    let zone = new NgZone({ enableLongStackTrace: true });

    let connection = new JConnectionStub();
    let hubConnectionfn = (url: string) => {
        connection.url = url;
        return connection;
    };

    it('connect should set defaults', () => {

        let signlar = new SignalR(configuration, zone, hubConnectionfn);
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


