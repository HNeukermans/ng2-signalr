// import { NgModule, ModuleWithProviders } from '@angular/core';

// @NgModule({
//     providers: [{
//                     provide: ActivatedRouteMock,
//                     useValue: SignalR
//                 }]
// })
// export class SignalRModule {
//     public static forRoot(getSignalRConfiguration: Function): ModuleWithProviders {
//         return {
//             ngModule: SignalRModule,
//             providers: [
//                 {
//                     provide: SIGNALR_CONFIGURATION,
//                     useFactory: getSignalRConfiguration
//                 },
//                 {
//                     deps: [SIGNALR_CONFIGURATION, NgZone],
//                     provide: SignalR,
//                     useFactory: (createSignalr)
//                 }
//             ],
//         };
//     }
//     public static forChild(): ModuleWithProviders {
//         throw new Error("forChild method not implemented");
//     }
// }
