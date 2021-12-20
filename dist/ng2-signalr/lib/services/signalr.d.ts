import { NgZone } from '@angular/core';
import { ISignalRConnection } from './connection/i.signalr.connection';
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { IConnectionOptions } from './connection/connection.options';
import * as i0 from "@angular/core";
export declare class SignalR {
    private _configuration;
    private _zone;
    private _jHubConnectionFn;
    constructor(configuration: SignalRConfiguration, zone: NgZone, jHubConnectionFn: any);
    createConnection(options?: IConnectionOptions): SignalRConnection;
    connect(options?: IConnectionOptions): Promise<ISignalRConnection>;
    private logConfiguration;
    private log;
    private merge;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalR, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalR>;
}
//# sourceMappingURL=signalr.d.ts.map