import { Resolve } from '@angular/router';
import { SignalRConnection, SignalR, SignalRConfiguration } from 'ng2-signalr';

export class HomeRouteResolver implements Resolve<SignalRConnection> {

    constructor() {}

    resolve() {
        console.log('HomeRouteResolver. Resolving...');
        let configuration = this.configure();
        return new SignalR(configuration).connect();
    }

    private configure(): SignalRConfiguration {
        let config = new SignalRConfiguration();
        config.hubName = 'Ng2SignalRHub';
        config.qs =  { user :  'Hannes'} ;
        config.url = 'http://localhost:10772/signalr/hubs';
        return config;
    }
}
