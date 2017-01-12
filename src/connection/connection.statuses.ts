import { ConnectionStatus } from './connection.status';

export class ConnectionStatuses {

    // TODO: prevent creating instances in every call to get() 
    private static statuses: ConnectionStatus[] = 
        [
            new ConnectionStatus("starting"),
            new ConnectionStatus("received"),
            new ConnectionStatus("connectionSlow"),
            new ConnectionStatus("reconnecting"),
            new ConnectionStatus("stateChanged"),
            new ConnectionStatus("starting"),
            new ConnectionStatus("disconnected"),
        ]; 

    public static get Starting(): ConnectionStatus {
        return ConnectionStatuses.statuses[0];
    }

    public static get Received(): ConnectionStatus {
        return ConnectionStatuses.statuses[1];
    }

    public static get ConnectionSlow(): ConnectionStatus {
        return ConnectionStatuses.statuses[2];
    }

    public static get Reconnecting(): ConnectionStatus {
        return ConnectionStatuses.statuses[3];
    }

    public static get Reconnected(): ConnectionStatus {
       return ConnectionStatuses.statuses[4];
    }

    public static get StateChanged(): ConnectionStatus {
        return ConnectionStatuses.statuses[5];
    }

    public static get Disconnected(): ConnectionStatus {
       return ConnectionStatuses.statuses[6];
    }
}