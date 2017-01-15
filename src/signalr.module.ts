import { NgModule, ModuleWithProviders, NgZone } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';

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
                    useFactory: (zone: NgZone) => new SignalR(configuration, zone),
                    deps: [NgZone]
                }
            ],
        };
    }
}