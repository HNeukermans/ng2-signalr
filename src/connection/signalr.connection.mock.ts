import { SignalRConnectionBase } from './signalr.connection.base';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SignalRConfiguration } from '../signalr.configuration';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from './connection.status';
import { Subject } from 'rxjs/Subject';

export interface ListenerCollection {
    [name: string]: BroadcastEventListener<any>;
}

export class SignalRConnectionMockObject extends SignalRConnectionBase {
    constructor(
        private _mockErrors$: Subject<any>, 
        private _mockStatus$: ReplaySubject<ConnectionStatus>,
        private _listeners: ListenerCollection) {
         super();
    }

    get errors(): Observable<any> {
        return this._mockErrors$;
    }

    get status(): Observable<ConnectionStatus> {
        return this._mockStatus$;
    }

    public stop(): void {
    }

   public start(): Promise<any> {
        return Promise.resolve(null); // TODO: implement
    }

    public invoke(method: string, ...parameters: any[]): Promise<any> {
        return Promise.resolve(null);
    }

    public listen<T>(listener: BroadcastEventListener<T>): void {
        this._listeners[listener.event] = listener;
    }
}

export class SignalRConnectionMock {
    private _status$: ReplaySubject<ConnectionStatus>;
    private _errors$: Subject<any>;
    private _object: SignalRConnectionBase;
    public listeners: ListenerCollection;

    constructor() {
        this._errors$ = new Subject<any>();
        this._status$ = new ReplaySubject<ConnectionStatus>();
        this.listeners = {};
        this._object = new SignalRConnectionMockObject(this._errors$, this._status$, this.listeners);
    }

    get fakeConnection(): SignalRConnectionBase {
        return this._object;
    }

    get errors$(): Subject<any> {
        return this._errors$;
    }

    // get status(): Observable<ConnectionStatus> {
    //     return this._status$;
    // }

    get status$(): ReplaySubject<ConnectionStatus> {
        return this._status$;
    }

    // public stop(): void {
    // }

    // public start(): Promise<any> {
    //     return Promise.resolve(null); // TODO: implement
    // }

    // public listen<T>(listener: BroadcastEventListener<T>): void {
    //     this.listeners[listener.event] = listener;
    // }

    // public invoke(method: string, ...parameters: any[]): Promise<any> {
    //     return Promise.resolve(null);
    // }
}
