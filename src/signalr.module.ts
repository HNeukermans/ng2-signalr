import { NgModule, ModuleWithProviders, NgZone } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';


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
                    provide: SignalR,
                    useFactory: (createSignalr),
                    deps: [NgZone]
                }
            ],
        };
    }
}