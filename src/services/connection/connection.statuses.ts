import { ConnectionStatus } from './connection.status';

export class ConnectionStatuses {

    private static statuses: ConnectionStatus[] =
        [
            new ConnectionStatus("starting"),
            new ConnectionStatus("received"),
            new ConnectionStatus("connectionSlow"),
            new ConnectionStatus("reconnecting"),
            new ConnectionStatus("reconnected"),
            new ConnectionStatus("stateChanged"),
            new ConnectionStatus("disconnected"),
        ];

    public static get starting(): ConnectionStatus {
        return ConnectionStatuses.statuses[0];
    }

    public static get received(): ConnectionStatus {
        return ConnectionStatuses.statuses[1];
    }

    public static get connectionSlow(): ConnectionStatus {
        return ConnectionStatuses.statuses[2];
    }

    public static get reconnecting(): ConnectionStatus {
        return ConnectionStatuses.statuses[3];
    }

    public static get reconnected(): ConnectionStatus {
       return ConnectionStatuses.statuses[4];
    }

    public static get stateChanged(): ConnectionStatus {
        return ConnectionStatuses.statuses[5];
    }

    public static get disconnected(): ConnectionStatus {
       return ConnectionStatuses.statuses[6];
    }
}