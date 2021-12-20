import { Observable, Subject } from 'rxjs';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { ConnectionStatus } from '../connection/connection.status';
import { ISignalRConnection } from '../connection/i.signalr.connection';
export interface IListenerCollection {
    [name: string]: BroadcastEventListener<any>;
}
export declare class SignalRConnectionMock implements ISignalRConnection {
    private _mockErrors$;
    private _mockStatus$;
    private _listeners;
    constructor(_mockErrors$: Subject<any>, _mockStatus$: Subject<ConnectionStatus>, _listeners: IListenerCollection);
    get errors(): Observable<any>;
    get status(): Observable<ConnectionStatus>;
    get id(): string;
    stop(): void;
    start(): Promise<any>;
    invoke(method: string, ...parameters: any[]): Promise<any>;
    listen<T>(listener: BroadcastEventListener<T>): void;
    listenFor<T>(event: string): BroadcastEventListener<T>;
    listenForRaw(event: string): BroadcastEventListener<any[]>;
    stopListening<T>(listener: BroadcastEventListener<T>): void;
}
//# sourceMappingURL=signalr.connection.mock.d.ts.map