import { SignalR } from './signalr';
import { NgZone } from '@angular/core';
import { SignalRConfiguration } from './signalr.configuration';
//import {  fakeAsync, tick } from '@angular/core/testing';
var mockjConnection = (function () {

    var mock: any = {};

    //first the items used by unit testing to see what has happened
    mock.callLog = [];
    mock.onFunctionDict = {};
    mock.doneFunc = null;
    mock.failFunc = null;
    mock.errorFunc = null;
    //This logs a string with the caller's function name and the parameters
    //you must provide the function name, but it finds the function arguments itself
    mock.logStep = function (funcName: any) {
        var log = funcName;
        mock.callLog.push(log);
    };
    mock.reset = function () {
        mock.callLog = [];
        mock.onFunctionDict = {};
        mock.doneFunc = null;
        mock.failFunc = null;
        mock.errorFunc = null;
    };

    //doneFail is the object returned by connection.start()
    var doneFail: any = {};
    doneFail.done = function (startFunc: any) {
        mock.logStep('connection.start.done');
        mock.doneFunc = startFunc;
        return doneFail;
    };
    doneFail.fail = function (failFunc: any) {
        mock.logStep('connection.start.fail');
        mock.failFunc = failFunc;
        return doneFail;
    };

    //Channel is the object returned by connection.createHubProxy
    var channel: any = {};
    channel.on = function (namedMessage: string, functionToCall: any) {
        mock.logStep('channel.on');
        mock.onFunctionDict[namedMessage] = functionToCall;
    };

    //connection is the object returned by $.hubConnection
    var connection: any = {};
    connection.createHubProxy = function (hubName: string) {
        return channel;
    };
    connection.error = function (errorFunc: any) {
        mock.logStep('connection.error');
        mock.errorFunc = errorFunc;
    };
    connection.start = function () {
        mock.logStep('connection.start');
        return doneFail;
    };
    connection.stop = function () {
        mock.logStep('connection.stop');
        return doneFail;
    };

    return connection;

})();

describe('SignalR', () => {

    let configuration = new SignalRConfiguration();
    configuration.url = 'http://localhost:3000';
    configuration.hubName = 'chathub';
    configuration.qs = { user: 'donald' };
    configuration.logging = true;
    let zone = new NgZone(true);

    let connection: any = mockjConnection;
    let hubConnectionfn = function (url: string) {
        connection.url = url;
        return connection;
    };

    it('connect should should set defaults', () => {

        // let signlar = new SignalR(configuration, zone, hubConnectionfn);
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


