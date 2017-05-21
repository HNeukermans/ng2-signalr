import { ConnectionTransport } from './connection.transport';

export interface IConnectionOptions {

    /** connection url to the SignalR service. */
    url?: string;

    /** Allows you to specify query string parameters object when the client connects. */
    qs?: any;

    /** name of the SignalR service hub to connect to. */
    hubName?: string;

    /** Allows jsonp */
    jsonp?: boolean;

    /** Allows withCredentials */
    withCredentials?: boolean;

    /** Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport. */
    transport?: ConnectionTransport | ConnectionTransport[];
}
