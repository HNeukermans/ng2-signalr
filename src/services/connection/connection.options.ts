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

    /** Allows pingInterval */
    pingInterval?: number;

    /** Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport. */
    transport?: ConnectionTransport | ConnectionTransport[];

    /** Allows you to run the event callback outside ngZone */
    executeEventsInZone?: boolean;

    /** Allows you to run the errors callback outside ngZone */
    executeErrorsInZone?: boolean;

    /** Allows you to run the status change in callback outside ngZone */
    executeStatusChangeInZone?: boolean;
}
