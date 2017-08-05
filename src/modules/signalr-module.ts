import { NgModule, ModuleWithProviders, NgZone, OpaqueToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { SignalRConfiguration } from '../services/signalr.configuration';

export const SIGNALR_CONFIGURATION_TOKEN = new OpaqueToken('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {

    let jConnectionFn = getJConnectionFn();

    return new SignalR(configuration, zone, jConnectionFn);
}

function getJConnectionFn(): any {
    let jQuery = getJquery();
    let hubConnectionFn = (<any> window).jQuery.hubConnection;
    if (hubConnectionFn == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    }
    return hubConnectionFn;
}

function getJquery(): any {
        let jQuery = (<any> window).jQuery;
        if (jQuery == null) {
            throw new Error('Signalr failed to initialize. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
        }
        return jQuery;
}

@NgModule({
    providers: [{
                    provide: SignalR,
                    useValue: SignalR
                }]
})
export class SignalRModule {
    public static forRoot(getSignalRConfiguration: Function): ModuleWithProviders {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION_TOKEN,
                    useFactory: getSignalRConfiguration
                },
                {
                    deps: [SIGNALR_CONFIGURATION_TOKEN, NgZone],
                    provide: SignalR,
                    useFactory: (createSignalr)
                }
            ],
        };
    }
    public static forChild(): ModuleWithProviders {
        throw new Error("forChild method not implemented");
    }
}
