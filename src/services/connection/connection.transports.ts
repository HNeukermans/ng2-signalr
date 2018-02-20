import { ConnectionTransport } from './connection.transport';

// @dynamic
export class ConnectionTransports {

    private static transports: ConnectionTransport[] =
        [
            new ConnectionTransport("foreverFrame"),
            new ConnectionTransport("longPolling"),
            new ConnectionTransport("serverSentEvents"),
            new ConnectionTransport("webSockets"),
            new ConnectionTransport("auto"),
        ];

    public static get foreverFrame(): ConnectionTransport {
        return ConnectionTransports.transports[0];
    }

    public static get longPolling(): ConnectionTransport {
        return ConnectionTransports.transports[1];
    }

    public static get serverSentEvents(): ConnectionTransport {
        return ConnectionTransports.transports[2];
    }

    public static get webSockets(): ConnectionTransport {
        return ConnectionTransports.transports[3];
    }

    public static get auto(): ConnectionTransport {
        return ConnectionTransports.transports[4];
    }
}
