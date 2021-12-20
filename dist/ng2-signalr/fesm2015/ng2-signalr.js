import { Subject } from 'rxjs';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, NgZone, NgModule } from '@angular/core';

class BroadcastEventListener extends Subject {
    constructor(event) {
        super();
        this.event = event;
        if (event == null || event === '') {
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
        }
    }
}

class SignalRConnectionMock {
    constructor(_mockErrors$, _mockStatus$, _listeners) {
        this._mockErrors$ = _mockErrors$;
        this._mockStatus$ = _mockStatus$;
        this._listeners = _listeners;
    }
    get errors() {
        return this._mockErrors$;
    }
    get status() {
        return this._mockStatus$.asObservable();
    }
    get id() {
        return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
    }
    stop() {
        //
    }
    start() {
        return Promise.resolve(null); // TODO: implement
    }
    invoke(method, ...parameters) {
        return Promise.resolve(null);
    }
    listen(listener) {
        this._listeners[listener.event] = listener;
    }
    listenFor(event) {
        const listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    }
    listenForRaw(event) {
        const listener = new BroadcastEventListener(event);
        this._listeners[listener.event] = listener;
        return listener;
    }
    stopListening(listener) {
        delete this._listeners[listener.event];
    }
}

class SignalRConnectionMockManager {
    constructor() {
        this._errors$ = new Subject();
        this._status$ = new Subject();
        this._listeners = {};
        this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
    }
    get mock() {
        return this._object;
    }
    get errors$() {
        return this._errors$;
    }
    get status$() {
        return this._status$;
    }
    get listeners() {
        return this._listeners;
    }
}

class ConnectionStatus {
    constructor(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    get value() {
        return this._value;
    }
    get name() {
        return ConnectionStatus.names[Number(this._value.toString())];
    }
    toString() {
        return this.name;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    }
}
ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];

// @dynamic
class ConnectionStatuses {
    static get connecting() {
        return ConnectionStatuses.statuses[0];
    }
    static get connected() {
        return ConnectionStatuses.statuses[1];
    }
    static get reconnecting() {
        return ConnectionStatuses.statuses[2];
    }
    static get disconnected() {
        return ConnectionStatuses.statuses[3];
    }
}
ConnectionStatuses.statuses = [
    new ConnectionStatus(0),
    new ConnectionStatus(1),
    new ConnectionStatus(2),
    new ConnectionStatus(4)
];

class SignalRConnection {
    constructor(jConnection, jProxy, zone, configuration) {
        this._enabledLogging = true;
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._zone = zone;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
        this._configuration = configuration;
        this._enabledLogging = configuration.logging;
        this._listeners = {};
    }
    get errors() {
        return this._errors;
    }
    get status() {
        return this._status;
    }
    get enabledLogging() {
        return this._enabledLogging;
    }
    set enabledLogging(val) {
        this._enabledLogging = val;
    }
    start() {
        const jTransports = this.convertTransports(this._configuration.transport);
        const $promise = new Promise((resolve, reject) => {
            this._jConnection
                .start({
                jsonp: this._configuration.jsonp,
                pingInterval: this._configuration.pingInterval,
                transport: jTransports,
                withCredentials: this._configuration.withCredentials,
            })
                .done(() => {
                this.log('Connection established, ID: ' + this._jConnection.id);
                this.log('Connection established, Transport: ' + this._jConnection.transport.name);
                resolve(this);
            })
                .fail((error) => {
                this.log('Could not connect');
                reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
            });
        });
        return $promise;
    }
    stop() {
        this._jConnection.stop();
    }
    get id() {
        return this._jConnection.id;
    }
    invoke(method, ...parameters) {
        if (method == null) {
            throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
        }
        this.log(`SignalRConnection. Start invoking \'${method}\'...`);
        const $promise = new Promise((resolve, reject) => {
            this._jProxy.invoke(method, ...parameters)
                .done((result) => {
                this.log(`\'${method}\' invoked succesfully. Resolving promise...`);
                resolve(result);
                this.log(`Promise resolved.`);
            })
                .fail((err) => {
                this.log(`Invoking \'${method}\' failed. Rejecting promise...`);
                reject(err);
                this.log(`Promise rejected.`);
            });
        });
        return $promise;
    }
    listen(listener) {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        const callback = (...args) => {
            this.run(() => {
                let casted = null;
                if (args.length > 0) {
                    casted = args[0];
                }
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(casted);
                this.log('listener next() called.');
            }, this._configuration.executeEventsInZone);
        };
        this.setListener(callback, listener);
    }
    stopListening(listener) {
        if (listener == null) {
            throw new Error('Failed to listen. Argument \'listener\' can not be null');
        }
        this.log(`SignalRConnection: Stopping listening to server event with name ${listener.event}`);
        if (!this._listeners[listener.event]) {
            this._listeners[listener.event] = [];
        }
        for (const callback of this._listeners[listener.event]) {
            this._jProxy.off(listener.event, callback);
        }
        this._listeners[listener.event] = [];
    }
    listenFor(event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        const listener = new BroadcastEventListener(event);
        this.listen(listener);
        return listener;
    }
    listenForRaw(event) {
        if (event == null || event === '') {
            throw new Error('Failed to listen. Argument \'event\' can not be empty');
        }
        const listener = new BroadcastEventListener(event);
        const callback = (...args) => {
            this.run(() => {
                let casted = [];
                if (args.length > 0) {
                    casted = args;
                }
                this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                listener.next(args);
                this.log('listener next() called.');
            }, this._configuration.executeEventsInZone);
        };
        this.setListener(callback, listener);
        return listener;
    }
    setListener(callback, listener) {
        this.log(`SignalRConnection: Starting to listen to server event with name ${listener.event}`);
        this._jProxy.on(listener.event, callback);
        if (this._listeners[listener.event] == null) {
            this._listeners[listener.event] = [];
        }
        this._listeners[listener.event].push(callback);
    }
    convertTransports(transports) {
        if (transports instanceof Array) {
            return transports.map((t) => t.name);
        }
        return transports.name;
    }
    wireUpErrorsAsObservable() {
        const sError = new Subject();
        this._jConnection.error((error) => {
            this.run(() => sError.next(error), this._configuration.executeErrorsInZone);
        });
        return sError;
    }
    wireUpStatusEventsAsObservable() {
        const sStatus = new Subject();
        // aggregate all signalr connection status handlers into 1 observable.
        // handler wire up, for signalr connection status callback.
        this._jConnection.stateChanged((change) => {
            this.run(() => sStatus.next(new ConnectionStatus(change.newState)), this._configuration.executeStatusChangeInZone);
        });
        return sStatus.asObservable();
    }
    onBroadcastEventReceived(listener, ...args) {
        this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
        let casted = null;
        if (args.length > 0) {
            casted = args[0];
        }
        this.run(() => {
            listener.next(casted);
        }, this._configuration.executeEventsInZone);
        this.log('listener next() called.');
    }
    log(...args) {
        if (this.enabledLogging === false) {
            return;
        }
        // tslint:disable-next-line: no-console
        console.log(args.join(', '));
    }
    run(func, inZone) {
        if (inZone) {
            this._zone.run(() => func());
        }
        else {
            this._zone.runOutsideAngular(() => func());
        }
    }
}

class ConnectionTransport {
    constructor(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    get name() {
        return this._name;
    }
    toString() {
        return this._name;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    }
}

// @dynamic
class ConnectionTransports {
    static get foreverFrame() {
        return ConnectionTransports.transports[0];
    }
    static get longPolling() {
        return ConnectionTransports.transports[1];
    }
    static get serverSentEvents() {
        return ConnectionTransports.transports[2];
    }
    static get webSockets() {
        return ConnectionTransports.transports[3];
    }
    static get auto() {
        return ConnectionTransports.transports[4];
    }
}
ConnectionTransports.transports = [
    new ConnectionTransport('foreverFrame'),
    new ConnectionTransport('longPolling'),
    new ConnectionTransport('serverSentEvents'),
    new ConnectionTransport('webSockets'),
    new ConnectionTransport('auto'),
];

class SignalRConfiguration {
    constructor() {
        this.hubName = null;
        this.logging = false;
        this.qs = null;
        this.url = null;
        this.jsonp = false;
        this.withCredentials = false;
        this.transport = ConnectionTransports.auto;
        this.executeEventsInZone = true;
        this.executeErrorsInZone = false;
        this.executeStatusChangeInZone = true;
        this.pingInterval = 300000;
    }
}

const SIGNALR_JCONNECTION_TOKEN = new InjectionToken('SIGNALR_JCONNECTION_TOKEN');

class SignalR {
    constructor(configuration, zone, jHubConnectionFn /* use type 'any'; Suggested workaround from angular repository: https://github.com/angular/angular/issues/12631 */) {
        this._configuration = configuration;
        this._zone = zone;
        this._jHubConnectionFn = jHubConnectionFn;
    }
    createConnection(options) {
        const configuration = this.merge(options ? options : {});
        this.logConfiguration(configuration);
        // create connection object
        const jConnection = this._jHubConnectionFn(configuration.url);
        jConnection.logging = configuration.logging;
        jConnection.qs = configuration.qs;
        // create a proxy
        const jProxy = jConnection.createHubProxy(configuration.hubName);
        // !!! important. We need to register at least one function otherwise server callbacks will not work.
        jProxy.on('noOp', () => { });
        const hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
        return hubConnection;
    }
    connect(options) {
        return this.createConnection(options).start();
    }
    logConfiguration(configuration) {
        try {
            const serializedQs = JSON.stringify(configuration.qs);
            const serializedTransport = JSON.stringify(configuration.transport);
            if (configuration.logging) {
                this.log(`Creating connecting with...`);
                this.log(`configuration:[url: '${configuration.url}'] ...`);
                this.log(`configuration:[hubName: '${configuration.hubName}'] ...`);
                this.log(`configuration:[qs: '${serializedQs}'] ...`);
                this.log(`configuration:[transport: '${serializedTransport}'] ...`);
            }
        }
        catch (err) { /* */ }
    }
    log(str) {
        // tslint:disable-next-line: no-console
        console.log(str);
    }
    merge(overrides) {
        const merged = new SignalRConfiguration();
        merged.hubName = overrides.hubName || this._configuration.hubName;
        merged.url = overrides.url || this._configuration.url;
        merged.qs = overrides.qs || this._configuration.qs;
        merged.logging = this._configuration.logging;
        merged.jsonp = overrides.jsonp || this._configuration.jsonp;
        merged.withCredentials = overrides.withCredentials || this._configuration.withCredentials;
        merged.transport = overrides.transport || this._configuration.transport;
        merged.executeEventsInZone = overrides.executeEventsInZone || this._configuration.executeEventsInZone;
        merged.executeErrorsInZone = overrides.executeErrorsInZone || this._configuration.executeErrorsInZone;
        merged.executeStatusChangeInZone = overrides.executeStatusChangeInZone || this._configuration.executeStatusChangeInZone;
        merged.pingInterval = overrides.pingInterval || this._configuration.pingInterval;
        return merged;
    }
}
SignalR.ɵfac = function SignalR_Factory(t) { return new (t || SignalR)(i0.ɵɵinject(SignalRConfiguration), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(SIGNALR_JCONNECTION_TOKEN)); };
SignalR.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SignalR, factory: SignalR.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignalR, [{
        type: Injectable
    }], function () { return [{ type: SignalRConfiguration }, { type: i0.NgZone }, { type: undefined, decorators: [{
                type: Inject,
                args: [SIGNALR_JCONNECTION_TOKEN]
            }] }]; }, null); })();

const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
function createSignalr(configuration, zone) {
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
function provideSignalr() {
    return new NgZone({});
}
class SignalRModule {
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

/*
 * Public API Surface of ng2-signalr
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BroadcastEventListener, ConnectionStatus, ConnectionStatuses, ConnectionTransport, ConnectionTransports, SignalR, SignalRConfiguration, SignalRConnection, SignalRConnectionMock, SignalRConnectionMockManager, SignalRModule };
//# sourceMappingURL=ng2-signalr.js.map
