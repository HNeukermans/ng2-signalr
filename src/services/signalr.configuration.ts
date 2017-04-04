
export class SignalRConfiguration {

    /** connection url to the SignalR service */
    public url: string;

    /** Allows you to specify query string parameters object when the client connects */
    public qs?: any;

    /** name of the SignalR service hub to connect to */
    public hubName: string;

    /** disable/enables client side logging. Defaults to false */
    public logging: boolean;

    /**Allow CORS */
    public jsonp: boolean;

    constructor() {
       this.hubName = null;
       this.logging = false;
       this.qs  = null;
       this.url = null;
       this.jsonp = false; 
    }
}

