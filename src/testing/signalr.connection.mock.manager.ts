import { Subject } from 'rxjs/Subject';
import { SignalRConnectionMock, ListenerCollection } from './signalr.connection.mock';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConnectionStatus } from '../connection/connection.status';

export class SignalRConnectionMockManager {
    private _status$: Subject<ConnectionStatus>;
    private _errors$: Subject<any>;
    private _object: SignalRConnectionMock;
    public _listeners: ListenerCollection;

    constructor() {
        this._errors$ = new Subject<any>();
        this._status$ = new Subject<ConnectionStatus>();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }

    get mock(): SignalRConnectionMock {
        return this._object;
    }

    get errors$(): Subject<any> {
        return this._errors$;
    }

    get status$(): Subject<ConnectionStatus> {
        return this._status$;
    }

    get listeners(): ListenerCollection {
        return this._listeners;
    }
}