import { NgZone } from '@angular/core';
import { ISignalRConnection } from './i.signalr.connection';
import { Observable } from 'rxjs';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
import { SignalRConfiguration } from '../signalr.configuration';
export declare type CallbackFn = (...args: any[]) => void;
export declare class SignalRConnection implements ISignalRConnection {
    private _status;
    private _errors;
    private _jConnection;
    private _jProxy;
    private _zone;
    private _configuration;
    private _listeners;
    private _enabledLogging;
    constructor(jConnection: any, jProxy: any, zone: NgZone, configuration: SignalRConfiguration);
    get errors(): Observable<any>;
    get status(): Observable<ConnectionStatus>;
    get enabledLogging(): boolean;
    set enabledLogging(val: boolean);
    start(): Promise<ISignalRConnection>;
    stop(): void;
    get id(): string;
    invoke(method: string, ...parameters: any[]): Promise<any>;
    listen<T>(listener: BroadcastEventListener<T>): void;
    stopListening<T>(listener: BroadcastEventListener<T>): void;
    listenFor<T>(event: string): BroadcastEventListener<T>;
    listenForRaw(event: string): BroadcastEventListener<any[]>;
    private setListener;
    private convertTransports;
    private wireUpErrorsAsObservable;
    private wireUpStatusEventsAsObservable;
    private onBroadcastEventReceived;
    private log;
    private run;
}
//# sourceMappingURL=signalr.connection.d.ts.map