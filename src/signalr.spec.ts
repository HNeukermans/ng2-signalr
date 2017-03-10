import { SignalR } from './signalr';
import { NgZone } from '@angular/core';
import { SignalRConfiguration } from './signalr.configuration';
//import {  fakeAsync, tick } from '@angular/core/testing';
import { JConnectionStub } from './connection/jConnection.stub';

describe('SignalR', () => {

    let configuration = new SignalRConfiguration();
    configuration.url = 'http://localhost:3000';
    configuration.hubName = 'chathub';
    configuration.qs = { user: 'donald' };
    configuration.logging = true;
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
        // }); 
        // tick();       
    });

    it('connect should should set defaults', () => {
        // let signlar = new SignalR(configuration, zone, hubConnectionfn);
        // signlar.connect();
    });
});


