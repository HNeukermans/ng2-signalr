import { SignalRConnectionBase } from "./signalr.connection.base";
import { Observable } from "rxjs/Observable";
import { AsyncSubject } from "rxjs/AsyncSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { SignalRConfiguration } from "../signalr.configuration";
import { BroadcastEventListener } from "../eventing/broadcast.event.listener";
import { ConnectionStatus } from "./connection.status";

export interface ListenerCollection {
    [name: string]: BroadcastEventListener<any>;
}

export class SignalRConnectionMock extends SignalRConnectionBase {
    private _status$: ReplaySubject<ConnectionStatus>;
    private _errors$: ReplaySubject<any>;
    public listeners: ListenerCollection;

    constructor() {
        super();
        this._errors$ = new ReplaySubject<any>();
        this._status$ = new ReplaySubject<ConnectionStatus>();
        this.listeners = {};
    }

    get errors(): Observable<any> {
        return this._errors$;
    }

    get errors$(): ReplaySubject<any> {
        return this._errors$;
    }

    get status(): Observable<ConnectionStatus> {
        return this._status$;
    }

    get status$(): ReplaySubject<ConnectionStatus> {
        return this._status$;
    }

    public stop(): void {
    }

    public start(): Promise<any> {
        return Promise.resolve(null); // TODO: implement
    }

    public listen<T>(listener: BroadcastEventListener<T>): void {
        this.listeners[listener.event] = listener;
    }

    public invoke(method: string, ...parameters: any[]): Promise<any> {
        return Promise.resolve(null);
    }
}
