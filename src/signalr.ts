import { SignalRConnectionBase } from './connection/signalr.connection.base';
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { NgZone, Injectable } from '@angular/core';

declare var jQuery: any;

@Injectable()
export class SignalR {
    private _configuration: SignalRConfiguration;
    private _zone: NgZone;

    public constructor(configuration: SignalRConfiguration, zone: NgZone) {
        this._configuration = configuration;
        this._zone = zone;
    }

    public connect(configuration: SignalRConfiguration = this._configuration): Promise<SignalRConnectionBase> {

        let $promise = new Promise<SignalRConnection>((resolve, reject) => {

        let jQuery = this.getJquery();
        let hubConnectionFn = this.getHubConnection();
        
        // create connection object
        let jConnection = hubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;

        // create a proxy
        let jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one on function otherwise server callbacks will not work. 
        jProxy.on('noOp', function () { });
           
            // start the connection
            console.log('Starting connection ...');
            // create EstablishedConnection before done, to allow replaysubjects to emit all events that occurred priorly. 
            let hubConnection = new SignalRConnection(jConnection, jProxy, this._zone);

            jConnection.start({ withCredentials: false })
                .done(function () {
                    console.log('Connection established, ID: ' + jConnection.id);
                    console.log('Connection established, Transport: ' + jConnection.transport.name);
                    resolve(hubConnection);
                })
                .fail(function (error: any) {
                    console.log('Could not connect');
                    reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
                });
        });

        return $promise;
    }

    private getJquery(): any {
        jQuery = (<any>window).jQuery;
        if (jQuery == null) throw new Error('Signalr failed to connect. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
        return jQuery;
    }

    private getHubConnection(): any {
        let hubConnectionFn = (<any>window).jQuery.hubConnection;
        if (hubConnectionFn == null) throw new Error('Signalr failed to connect. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
        return hubConnectionFn;
    }
}
