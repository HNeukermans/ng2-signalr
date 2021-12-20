import { ModuleWithProviders, NgZone } from '@angular/core';
import { SignalR } from '../services/signalr';
import { SignalRConfiguration } from '../services/signalr.configuration';
import * as i0 from "@angular/core";
export declare function createSignalr(configuration: SignalRConfiguration, zone: NgZone): SignalR;
export declare function provideSignalr(): NgZone;
export declare class SignalRModule {
    static forRoot(getSignalRConfiguration: () => void): ModuleWithProviders<SignalRModule>;
    static forChild(): ModuleWithProviders<SignalRModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalRModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SignalRModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SignalRModule>;
}
//# sourceMappingURL=signalr-module.d.ts.map