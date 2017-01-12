
export class SignalRConfiguration {
    
    /** connection url to the SignalR service*/
    url: string;

    /** Allows you to specify query string parameters object when the client connects*/
    qs?: any;
  
    /** name of the SignalR service hub to connect to*/
    hubName: string;

    /** disable/enables client side logging. Defaults to false */
    logging: boolean;

    constructor() {
       this.hubName = null;
       this.logging = false;
       this.qs  = null;
       this.url = null;
    }
}

