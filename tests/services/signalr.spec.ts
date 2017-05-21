
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
    let zone = new NgZone(true);

    let connection = new JConnectionStub();
    let hubConnectionfn = function (url: string) {
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

    it('connect should set defaults', () => {
        // let signlar = new SignalR(configuration, zone, hubConnectionfn);
        // signlar.connect();
    });

    it('convertTransports should get valid transports from configuration', () => {
        let signlar = new SignalR(configuration, zone, hubConnectionfn);
        let transport1 = ConnectionTransports.longPolling;
        let transport2 = [ConnectionTransports.longPolling, ConnectionTransports.auto];

        let converted1 = signlar.convertTransports(transport1);
        let converted2 = signlar.convertTransports(transport2);

        expect(converted1).toEqual(transport1.name);
        expect(converted2).toEqual(transport2.map(t => t.name));
    });
});


