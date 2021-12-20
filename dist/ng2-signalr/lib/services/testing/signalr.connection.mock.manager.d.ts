import { Subject } from 'rxjs';
import { SignalRConnectionMock, IListenerCollection } from './signalr.connection.mock';
import { ConnectionStatus } from '../connection/connection.status';
export declare class SignalRConnectionMockManager {
    private _listeners;
    private _status$;
    private _errors$;
    private _object;
    constructor();
    get mock(): SignalRConnectionMock;
    get errors$(): Subject<any>;
    get status$(): Subject<ConnectionStatus>;
    get listeners(): IListenerCollection;
}
//# sourceMappingURL=signalr.connection.mock.manager.d.ts.map