
import { ConnectionTransports } from './connection/connection.transports';
import { ConnectionTransport } from './connection/connection.transport';

export class SignalRConfiguration {

    /** connection url to the SignalR service */
    public url: string;

    /** Allows you to specify query string parameters object when the client connects */
    public qs?: any;

    /** name of the SignalR service hub to connect to */
    public hubName: string;

    /** disable/enables client side logging. Defaults to false */
    public logging: boolean;

    /** Allows jsonp. This flag can be used to suppport CORS on older browsers */
    public jsonp: boolean;

     /** Allows withCredentials. This flag can be used to suppport CORS */
    public withCredentials: boolean;

    /** Allows you to specify transport. You can specify a fallback order if you wan't to try specific transports in order. By default selects best avaliable transport. */
    public transport: ConnectionTransport | ConnectionTransport[];

    constructor() {
       this.hubName = null;
       this.logging = false;
       this.qs  = null;
       this.url = null;
       this.jsonp = false;
       this.withCredentials = false;
       this.transport = ConnectionTransports.auto;
    }
}

