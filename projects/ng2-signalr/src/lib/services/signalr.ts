import { ISignalRConnection } from './connection/i.signalr.connection';
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { NgZone, Injectable, Inject } from '@angular/core';
import { IConnectionOptions } from './connection/connection.options';
import { ConnectionTransport } from './connection/connection.transport';
import { Observable } from 'rxjs';
import { ConnectionStatus } from './connection/connection.status';
import { SIGNALR_JCONNECTION_TOKEN } from "./signalr.module";

declare var jQuery: any;

@Injectable()
export class SignalR {
    private _configuration: SignalRConfiguration;
    private _zone: NgZone;
    private _jHubConnectionFn: any;

    public constructor(
        configuration: SignalRConfiguration,
        zone: NgZone,
        @Inject(SIGNALR_JCONNECTION_TOKEN) jHubConnectionFn: any /* use type 'any'; Suggested workaround from angular repository: https://github.com/angular/angular/issues/12631 */
    ) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }

    public createConnection(options?: IConnectionOptions): SignalRConnection {
        const configuration = this.merge(options ? options : {});

        this.logConfiguration(configuration);

        // create connection object
        const jConnection = this._jHubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;

        // create a proxy
        const jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one function otherwise server callbacks will not work.
        jProxy.on('noOp', () => { /* */ });

        const hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);

        return hubConnection;
    }

    public connect(options?: IConnectionOptions): Promise<ISignalRConnection> {
        return this.createConnection(options).start();
    }

    private logConfiguration(configuration: SignalRConfiguration) {
        try {
            const serializedQs = JSON.stringify(configuration.qs);
            const serializedTransport = JSON.stringify(configuration.transport);
            if (configuration.logging) {
                console.log(`Creating connecting with...`);
                console.log(`configuration:[url: '${configuration.url}'] ...`);
                console.log(`configuration:[hubName: '${configuration.hubName}'] ...`);
                console.log(`configuration:[qs: '${serializedQs}'] ...`);
                console.log(`configuration:[transport: '${serializedTransport}'] ...`);
            }
        } catch (err) { /* */ }
    }

    private merge(overrides: IConnectionOptions): SignalRConfiguration {
        const merged: SignalRConfiguration = new SignalRConfiguration();
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        merged.jsonp = overrides.jsonp || this._configuration.jsonp;
        merged.withCredentials = overrides.withCredentials || this._configuration.withCredentials;
        merged.transport = overrides.transport || this._configuration.transport;
        merged.executeEventsInZone = overrides.executeEventsInZone || this._configuration.executeEventsInZone;
        merged.executeErrorsInZone = overrides.executeErrorsInZone || this._configuration.executeErrorsInZone;
        merged.executeStatusChangeInZone = overrides.executeStatusChangeInZone || this._configuration.executeStatusChangeInZone;
        merged.pingInterval = overrides.pingInterval || this._configuration.pingInterval;
        return merged;
    }

}
