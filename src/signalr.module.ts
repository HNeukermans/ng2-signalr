import { NgModule, ModuleWithProviders, NgZone, OpaqueToken } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';

const SIGNALR_CONFIGURATION = new OpaqueToken('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {

    let jConnectionFn = getJConnectionFn();

    return new SignalR(configuration, zone, jConnectionFn);
}

function getJConnectionFn(): any {
    let jQuery = getJquery();
    let hubConnectionFn = (<any>window).jQuery.hubConnection;
    if (hubConnectionFn == null) throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    return hubConnectionFn;
}

function getJquery(): any {
        let jQuery = (<any>window).jQuery;
        if (jQuery == null) throw new Error('Signalr failed to initialize. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
        return jQuery;
}

@NgModule({
    providers: [{
                    provide: SignalR,
                    useValue: SignalR
                }]
})
export class SignalRModule {
    public static configure(configuration: SignalRConfiguration): ModuleWithProviders {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useValue: configuration
                },
                {
                    provide: SignalR,
                    useFactory: (createSignalr),
                    deps: [SIGNALR_CONFIGURATION, NgZone]
                }
            ],
        };
    }
}