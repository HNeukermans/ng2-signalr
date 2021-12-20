import { ConnectionTransport } from './connection.transport';
export declare class ConnectionTransports {
    private static transports;
    static get foreverFrame(): ConnectionTransport;
    static get longPolling(): ConnectionTransport;
    static get serverSentEvents(): ConnectionTransport;
    static get webSockets(): ConnectionTransport;
    static get auto(): ConnectionTransport;
}
//# sourceMappingURL=connection.transports.d.ts.map