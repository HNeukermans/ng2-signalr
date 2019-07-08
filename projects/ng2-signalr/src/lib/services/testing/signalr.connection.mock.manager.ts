import { Subject, ReplaySubject } from 'rxjs';
import { SignalRConnectionMock, IListenerCollection } from './signalr.connection.mock';
import { ConnectionStatus } from '../connection/connection.status';

export class SignalRConnectionMockManager {

    private _listeners: IListenerCollection;
    private _status$: Subject<ConnectionStatus>;
    private _errors$: Subject<any>;
    private _object: SignalRConnectionMock;

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

    get listeners(): IListenerCollection {
        return this._listeners;
    }
}
