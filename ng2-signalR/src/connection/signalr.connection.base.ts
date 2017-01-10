import { Observable } from "rxjs/Observable";
import { SignalRConfiguration } from "../signalr.configuration";
import { BroadcastEventListener } from "../eventing/broadcast.event.listener";
import { ConnectionStatus } from "./connection.status";

export abstract class SignalRConnectionBase {
    public abstract get status(): Observable<ConnectionStatus>;
    public abstract get errors(): Observable<any>;
    public abstract invoke(method: string, ...parameters: any[]): Promise<any>
    public abstract listen<T>(listener: BroadcastEventListener<T>): void;
    public abstract stop(): void;
    public abstract start(): Promise<any>;
} 