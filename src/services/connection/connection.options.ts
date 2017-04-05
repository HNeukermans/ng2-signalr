export interface IConnectionOptions {

    /** connection url to the SignalR service. */
    url?: string;

    /** Allows you to specify query string parameters object when the client connects. */
    qs?: any;

    /** name of the SignalR service hub to connect to. */
    hubName?: string;

    /**Allow CORS */
    jsonp: boolean;
}
