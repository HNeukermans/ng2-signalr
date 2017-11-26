import { ConnectionStatus } from './connection.status';

// @dynamic
export class ConnectionStatuses {

    private static statuses: ConnectionStatus[] =
        [
            new ConnectionStatus(0),
            new ConnectionStatus(1),
            new ConnectionStatus(2),
            new ConnectionStatus(4)
        ];

    public static get connecting(): ConnectionStatus {
        return ConnectionStatuses.statuses[0];
    }

    public static get connected(): ConnectionStatus {
        return ConnectionStatuses.statuses[1];
    }

    public static get reconnecting(): ConnectionStatus {
        return ConnectionStatuses.statuses[2];
    }

    public static get disconnected(): ConnectionStatus {
        return ConnectionStatuses.statuses[3];
    }
}
