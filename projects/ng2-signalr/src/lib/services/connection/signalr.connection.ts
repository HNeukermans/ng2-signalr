import { ISignalRConnection } from './i.signalr.connection';
import { Observable, Subject } from 'rxjs';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
import { NgZone } from '@angular/core';
import { SignalRConfiguration } from '../signalr.configuration';
import { ConnectionTransport } from './connection.transport';

export declare type CallbackFn = (...args: any[]) => void;

export class SignalRConnection implements ISignalRConnection {
    private _status: Observable<ConnectionStatus>;
    private _errors: Observable<any>;
    private _jConnection: any;
    private _jProxy: any;
    private _zone: NgZone;
    private _configuration: SignalRConfiguration;
    private _listeners: { [eventName: string]: CallbackFn[] };

    constructor(jConnection: any, jProxy: any, zone: NgZone, configuration: SignalRConfiguration) {
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
        this._configuration = configuration;
        this._listeners = {};
    }

    public get errors(): Observable<any> {
        return this._errors;
    }

    public get status(): Observable<ConnectionStatus> {
        return this._status;
    }

    public start(): Promise<ISignalRConnection> {

        const jTransports = this.convertTransports(this._configuration.transport);

        const $promise = new Promise<ISignalRConnection>((resolve, reject) => {
            this._jConnection
                .start({
                    jsonp: this._configuration.jsonp,
                    pingInterval: this._configuration.pingInterval,
                    transport: jTransports,
                    withCredentials: this._configuration.withCredentials,
                })
                .done(() => {
                    console.log('Connection established, ID: ' + this._jConnection.id);
                    console.log('Connection established, Transport: ' + this._jConnection.transport.name);
                    resolve(this);
                })
                .fail((error: any) => {
                    console.log('Could not connect');
                    reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
                });
        });
        return $promise;
    }

    public stop(): void {
        this._jConnection.stop();
    }

    public get id(): string {
        return this._jConnection.id;
    }

    public invoke(method: string, ...parameters: any[]): Promise<any> {
        if (method == null) {
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        }
        this.log(`SignalRConnection. Start invoking \'${method}\'...`);

        const $promise = new Promise<any>((resolve, reject) => {
            this._jProxy.invoke(method, ...parameters)
                .done((result: any) => {
                    this.log(`\'${method}\' invoked succesfully. Resolving promise...`);
                    resolve(result);
                    this.log(`Promise resolved.`);
                })
                .fail((err: any) => {
                    console.log(`Invoking \'${method}\' failed. Rejecting promise...`);
                    reject(err);
                    console.log(`Promise rejected.`);
                });
        });
        return $promise;
    }

    public listen<T>(listener: BroadcastEventListener<T>): void {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }

        const callback: CallbackFn = (...args: any[]) => {
            this.run(() => {
                let casted: T = null;
                if (args.length > 0) {
                    casted = args[0] as T;
                }
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                this.log('listener next() called.');
            }, this._configuration.executeEventsInZone);
        };

        this.setListener(callback, listener);
    }

    public stopListening<T>(listener: BroadcastEventListener<T>): void {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }

        this.log(`SignalRConnection: Stopping listening to server event with name ${listener.event}`);
        if (!this._listeners[listener.event]) {
            this._listeners[listener.event] = [];
        }

        for (const callback of this._listeners[listener.event]) {
            this._jProxy.off(listener.event, callback);
        }

        this._listeners[listener.event] = [];
    }

    public listenFor<T>(event: string): BroadcastEventListener<T> {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }

        const listener = new BroadcastEventListener<T>(event);

        this.listen(listener);

        return listener;
    }

    public listenForRaw(event: string): BroadcastEventListener<any[]> {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }

        const listener = new BroadcastEventListener<any[]>(event);

        const callback: CallbackFn = (...args: any[]) => {
            this.run(() => {
                let casted: any[] = [];
                if (args.length > 0) {
                    casted = args;
                }
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(args);
                this.log('listener next() called.');
            }, this._configuration.executeEventsInZone);
        };

        this.setListener(callback, listener);
        return listener;
    }

    private setListener<T>(callback: CallbackFn, listener: BroadcastEventListener<T>) {
        this.log(`SignalRConnection: Starting to listen to server event with name ${listener.event}`);
        this._jProxy.on(listener.event, callback);

        if (this._listeners[listener.event] == null) {
            this._listeners[listener.event] = [];
        }

        this._listeners[listener.event].push(callback);
    }

    private convertTransports(transports: ConnectionTransport | ConnectionTransport[]): any {
        if (transports instanceof Array) {
            return transports.map((t: ConnectionTransport) => t.name);
        }
        return transports.name;
    }

    private wireUpErrorsAsObservable(): Observable<any> {
        const sError = new Subject<any>();

        this._jConnection.error((error: any) => {
            this.run(() => sError.next(error), this._configuration.executeErrorsInZone);
        });
        return sError;
    }

    private wireUpStatusEventsAsObservable(): Observable<ConnectionStatus> {
        const sStatus = new Subject<ConnectionStatus>();
        // aggregate all signalr connection status handlers into 1 observable.
        // handler wire up, for signalr connection status callback.
        this._jConnection.stateChanged((change: any) => {
            this.run(() => sStatus.next(new ConnectionStatus(change.newState)),
                this._configuration.executeStatusChangeInZone);
        });
        return sStatus.asObservable();
    }

    private onBroadcastEventReceived<T>(listener: BroadcastEventListener<T>, ...args: any[]) {
        this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');

        let casted: T = null;
        if (args.length > 0) {
            casted = args[0] as T;
        }

        this.run(() => {
            listener.next(casted);
        }, this._configuration.executeEventsInZone);

        this.log('listener next() called.');
    }

    private log(...args: any[]) {
        if (this._jConnection.logging === false) {
            return;
        }
        console.log(args.join(', '));
    }

    private run(func: () => void, inZone: boolean) {
        if (inZone) {
            this._zone.run(() => func());
        } else {
            this._zone.runOutsideAngular(() => func());
        }
    }
}
