import { NgModule, ModuleWithProviders, NgZone, OpaqueToken } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';

const SIGNALR_CONFIGURATION = new OpaqueToken('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {
    return new SignalR(configuration, zone);
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