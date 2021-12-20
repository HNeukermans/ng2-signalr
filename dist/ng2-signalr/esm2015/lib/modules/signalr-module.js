import { NgModule, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import * as i0 from "@angular/core";
const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
export function createSignalr(configuration, zone) {
    const jConnectionFn = getJConnectionFn();
    return new SignalR(configuration, zone, jConnectionFn);
}
function getJConnectionFn() {
    const jQuery = getJquery();
    const hubConnectionFn = jQuery.hubConnection;
    if (hubConnectionFn == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    }
    return hubConnectionFn;
}
function getJquery() {
    const jQuery = window.jQuery;
    if (jQuery == null) {
        throw new Error('Signalr failed to initialize. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
    }
    return jQuery;
}
export function provideSignalr() {
    return new NgZone({});
}
export class SignalRModule {
    static forRoot(getSignalRConfiguration) {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    deps: [SIGNALR_CONFIGURATION, NgZone],
                    provide: SignalR,
                    useFactory: (createSignalr)
                },
                {
                    provide: NgZone,
                    useFactory: (provideSignalr)
                }
            ],
        };
    }
    static forChild() {
        throw new Error('forChild method not implemented');
    }
}
SignalRModule.ɵfac = function SignalRModule_Factory(t) { return new (t || SignalRModule)(); };
SignalRModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SignalRModule });
SignalRModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [{
            provide: SignalR,
            useValue: SignalR
        }] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignalRModule, [{
        type: NgModule,
        args: [{
                providers: [{
                        provide: SignalR,
                        useValue: SignalR
                    }]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc2lnbmFsci9zcmMvbGliL21vZHVsZXMvc2lnbmFsci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRzlDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQXVCLHVCQUF1QixDQUFDLENBQUM7QUFFaEcsTUFBTSxVQUFVLGFBQWEsQ0FBQyxhQUFtQyxFQUFFLElBQVk7SUFFM0UsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELFNBQVMsZ0JBQWdCO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBQzNCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDN0MsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0lBQWtJLENBQUMsQ0FBQztLQUN2SjtJQUNELE9BQU8sZUFBZSxDQUFDO0FBQzNCLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDZCxNQUFNLE1BQU0sR0FBSSxNQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3RDLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDJHQUEyRyxDQUFDLENBQUM7S0FDaEk7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWM7SUFDNUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBUUQsTUFBTSxPQUFPLGFBQWE7SUFDZixNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUFtQztRQUNyRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFVBQVUsRUFBRSx1QkFBdUI7aUJBQ3RDO2dCQUNEO29CQUNJLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQztvQkFDckMsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDOUI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLE1BQU07b0JBQ2YsVUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDO2lCQUM3QjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDTSxNQUFNLENBQUMsUUFBUTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7MEVBdkJRLGFBQWE7K0RBQWIsYUFBYTtvRUFMWCxDQUFDO1lBQ1IsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLE9BQU87U0FDcEIsQ0FBQzt1RkFFTyxhQUFhO2NBTnpCLFFBQVE7ZUFBQztnQkFDTixTQUFTLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsUUFBUSxFQUFFLE9BQU87cUJBQ3BCLENBQUM7YUFDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ1pvbmUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpZ25hbFIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyJztcclxuaW1wb3J0IHsgU2lnbmFsUkNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9zZXJ2aWNlcy9zaWduYWxyLmNvbmZpZ3VyYXRpb24nO1xyXG5cclxuY29uc3QgU0lHTkFMUl9DT05GSUdVUkFUSU9OID0gbmV3IEluamVjdGlvblRva2VuPFNpZ25hbFJDb25maWd1cmF0aW9uPignU0lHTkFMUl9DT05GSUdVUkFUSU9OJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lnbmFscihjb25maWd1cmF0aW9uOiBTaWduYWxSQ29uZmlndXJhdGlvbiwgem9uZTogTmdab25lKSB7XHJcblxyXG4gICAgY29uc3QgakNvbm5lY3Rpb25GbiA9IGdldEpDb25uZWN0aW9uRm4oKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFNpZ25hbFIoY29uZmlndXJhdGlvbiwgem9uZSwgakNvbm5lY3Rpb25Gbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEpDb25uZWN0aW9uRm4oKTogYW55IHtcclxuICAgIGNvbnN0IGpRdWVyeSA9IGdldEpxdWVyeSgpO1xyXG4gICAgY29uc3QgaHViQ29ubmVjdGlvbkZuID0galF1ZXJ5Lmh1YkNvbm5lY3Rpb247XHJcbiAgICBpZiAoaHViQ29ubmVjdGlvbkZuID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZ25hbHIgZmFpbGVkIHRvIGluaXRpYWxpemUuIFNjcmlwdCBcXCdqcXVlcnkuc2lnbmFsUi5qc1xcJyBpcyBtaXNzaW5nLiBQbGVhc2UgbWFrZSBzdXJlIHRvIGluY2x1ZGUgXFwnanF1ZXJ5LnNpZ25hbFIuanNcXCcgc2NyaXB0LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh1YkNvbm5lY3Rpb25GbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SnF1ZXJ5KCk6IGFueSB7XHJcbiAgICBjb25zdCBqUXVlcnkgPSAod2luZG93IGFzIGFueSkualF1ZXJ5O1xyXG4gICAgaWYgKGpRdWVyeSA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWduYWxyIGZhaWxlZCB0byBpbml0aWFsaXplLiBTY3JpcHQgXFwnanF1ZXJ5LmpzXFwnIGlzIG1pc3NpbmcuIFBsZWFzZSBtYWtlIHN1cmUgdG8gaW5jbHVkZSBqcXVlcnkgc2NyaXB0LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGpRdWVyeTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTaWduYWxyKCk6IE5nWm9uZSB7XHJcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe30pO1xyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbe1xyXG4gICAgICAgIHByb3ZpZGU6IFNpZ25hbFIsXHJcbiAgICAgICAgdXNlVmFsdWU6IFNpZ25hbFJcclxuICAgIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWduYWxSTW9kdWxlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChnZXRTaWduYWxSQ29uZmlndXJhdGlvbjogKCkgPT4gdm9pZCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U2lnbmFsUk1vZHVsZT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTaWduYWxSTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTSUdOQUxSX0NPTkZJR1VSQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogZ2V0U2lnbmFsUkNvbmZpZ3VyYXRpb25cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1NJR05BTFJfQ09ORklHVVJBVElPTiwgTmdab25lXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBTaWduYWxSLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IChjcmVhdGVTaWduYWxyKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgcHJvdmlkZTogTmdab25lLFxyXG4gICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAocHJvdmlkZVNpZ25hbHIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTaWduYWxSTW9kdWxlPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JDaGlsZCBtZXRob2Qgbm90IGltcGxlbWVudGVkJyk7XHJcbiAgICB9XHJcbn1cclxuIl19