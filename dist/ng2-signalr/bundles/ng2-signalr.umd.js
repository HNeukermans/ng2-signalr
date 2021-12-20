(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ng2-signalr', ['exports', 'rxjs', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ng2-signalr"] = {}, global.rxjs, global.ng.core));
})(this, (function (exports, rxjs, i0) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var BroadcastEventListener = /** @class */ (function (_super) {
        __extends(BroadcastEventListener, _super);
        function BroadcastEventListener(event) {
            var _this = _super.call(this) || this;
            _this.event = event;
            if (event == null || event === '') {
                throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
            }
            return _this;
        }
        return BroadcastEventListener;
    }(rxjs.Subject));

    var SignalRConnectionMock = /** @class */ (function () {
        function SignalRConnectionMock(_mockErrors$, _mockStatus$, _listeners) {
            this._mockErrors$ = _mockErrors$;
            this._mockStatus$ = _mockStatus$;
            this._listeners = _listeners;
        }
        Object.defineProperty(SignalRConnectionMock.prototype, "errors", {
            get: function () {
                return this._mockErrors$;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnectionMock.prototype, "status", {
            get: function () {
                return this._mockStatus$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnectionMock.prototype, "id", {
            get: function () {
                return 'xxxxxxxx-xxxx-xxxx-xxxxxxxxx';
            },
            enumerable: false,
            configurable: true
        });
        SignalRConnectionMock.prototype.stop = function () {
            //
        };
        SignalRConnectionMock.prototype.start = function () {
            return Promise.resolve(null); // TODO: implement
        };
        SignalRConnectionMock.prototype.invoke = function (method) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            return Promise.resolve(null);
        };
        SignalRConnectionMock.prototype.listen = function (listener) {
            this._listeners[listener.event] = listener;
        };
        SignalRConnectionMock.prototype.listenFor = function (event) {
            var listener = new BroadcastEventListener(event);
            this.listen(listener);
            return listener;
        };
        SignalRConnectionMock.prototype.listenForRaw = function (event) {
            var listener = new BroadcastEventListener(event);
            this._listeners[listener.event] = listener;
            return listener;
        };
        SignalRConnectionMock.prototype.stopListening = function (listener) {
            delete this._listeners[listener.event];
        };
        return SignalRConnectionMock;
    }());

    var SignalRConnectionMockManager = /** @class */ (function () {
        function SignalRConnectionMockManager() {
            this._errors$ = new rxjs.Subject();
            this._status$ = new rxjs.Subject();
            this._listeners = {};
            this._object = new SignalRConnectionMock(this._errors$, this._status$, this._listeners);
        }
        Object.defineProperty(SignalRConnectionMockManager.prototype, "mock", {
            get: function () {
                return this._object;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnectionMockManager.prototype, "errors$", {
            get: function () {
                return this._errors$;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnectionMockManager.prototype, "status$", {
            get: function () {
                return this._status$;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnectionMockManager.prototype, "listeners", {
            get: function () {
                return this._listeners;
            },
            enumerable: false,
            configurable: true
        });
        return SignalRConnectionMockManager;
    }());

    var ConnectionStatus = /** @class */ (function () {
        function ConnectionStatus(value) {
            if (value == null || value < 0) {
                throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
            }
            this._value = value;
        }
        Object.defineProperty(ConnectionStatus.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionStatus.prototype, "name", {
            get: function () {
                return ConnectionStatus.names[Number(this._value.toString())];
            },
            enumerable: false,
            configurable: true
        });
        ConnectionStatus.prototype.toString = function () {
            return this.name;
        };
        ConnectionStatus.prototype.equals = function (other) {
            if (other == null) {
                return false;
            }
            return this._value === other.value;
        };
        return ConnectionStatus;
    }());
    ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];

    // @dynamic
    var ConnectionStatuses = /** @class */ (function () {
        function ConnectionStatuses() {
        }
        Object.defineProperty(ConnectionStatuses, "connecting", {
            get: function () {
                return ConnectionStatuses.statuses[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionStatuses, "connected", {
            get: function () {
                return ConnectionStatuses.statuses[1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionStatuses, "reconnecting", {
            get: function () {
                return ConnectionStatuses.statuses[2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionStatuses, "disconnected", {
            get: function () {
                return ConnectionStatuses.statuses[3];
            },
            enumerable: false,
            configurable: true
        });
        return ConnectionStatuses;
    }());
    ConnectionStatuses.statuses = [
        new ConnectionStatus(0),
        new ConnectionStatus(1),
        new ConnectionStatus(2),
        new ConnectionStatus(4)
    ];

    var SignalRConnection = /** @class */ (function () {
        function SignalRConnection(jConnection, jProxy, zone, configuration) {
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
        Object.defineProperty(SignalRConnection.prototype, "errors", {
            get: function () {
                return this._errors;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnection.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SignalRConnection.prototype, "enabledLogging", {
            get: function () {
                return this._enabledLogging;
            },
            set: function (val) {
                this._enabledLogging = val;
            },
            enumerable: false,
            configurable: true
        });
        SignalRConnection.prototype.start = function () {
            var _this = this;
            var jTransports = this.convertTransports(this._configuration.transport);
            var $promise = new Promise(function (resolve, reject) {
                _this._jConnection
                    .start({
                    jsonp: _this._configuration.jsonp,
                    pingInterval: _this._configuration.pingInterval,
                    transport: jTransports,
                    withCredentials: _this._configuration.withCredentials,
                })
                    .done(function () {
                    _this.log('Connection established, ID: ' + _this._jConnection.id);
                    _this.log('Connection established, Transport: ' + _this._jConnection.transport.name);
                    resolve(_this);
                })
                    .fail(function (error) {
                    _this.log('Could not connect');
                    reject('Failed to connect. Error: ' + error.message); // ex: Error during negotiation request.
                });
            });
            return $promise;
        };
        SignalRConnection.prototype.stop = function () {
            this._jConnection.stop();
        };
        Object.defineProperty(SignalRConnection.prototype, "id", {
            get: function () {
                return this._jConnection.id;
            },
            enumerable: false,
            configurable: true
        });
        SignalRConnection.prototype.invoke = function (method) {
            var _this = this;
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            if (method == null) {
                throw new Error('SignalRConnection: Failed to invoke. Argument \'method\' can not be null');
            }
            this.log("SignalRConnection. Start invoking '" + method + "'...");
            var $promise = new Promise(function (resolve, reject) {
                var _a;
                (_a = _this._jProxy).invoke.apply(_a, __spreadArray([method], __read(parameters))).done(function (result) {
                    _this.log("'" + method + "' invoked succesfully. Resolving promise...");
                    resolve(result);
                    _this.log("Promise resolved.");
                })
                    .fail(function (err) {
                    _this.log("Invoking '" + method + "' failed. Rejecting promise...");
                    reject(err);
                    _this.log("Promise rejected.");
                });
            });
            return $promise;
        };
        SignalRConnection.prototype.listen = function (listener) {
            var _this = this;
            if (listener == null) {
                throw new Error('Failed to listen. Argument \'listener\' can not be null');
            }
            var callback = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.run(function () {
                    var casted = null;
                    if (args.length > 0) {
                        casted = args[0];
                    }
                    _this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                    listener.next(casted);
                    _this.log('listener next() called.');
                }, _this._configuration.executeEventsInZone);
            };
            this.setListener(callback, listener);
        };
        SignalRConnection.prototype.stopListening = function (listener) {
            var e_1, _a;
            if (listener == null) {
                throw new Error('Failed to listen. Argument \'listener\' can not be null');
            }
            this.log("SignalRConnection: Stopping listening to server event with name " + listener.event);
            if (!this._listeners[listener.event]) {
                this._listeners[listener.event] = [];
            }
            try {
                for (var _b = __values(this._listeners[listener.event]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var callback = _c.value;
                    this._jProxy.off(listener.event, callback);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._listeners[listener.event] = [];
        };
        SignalRConnection.prototype.listenFor = function (event) {
            if (event == null || event === '') {
                throw new Error('Failed to listen. Argument \'event\' can not be empty');
            }
            var listener = new BroadcastEventListener(event);
            this.listen(listener);
            return listener;
        };
        SignalRConnection.prototype.listenForRaw = function (event) {
            var _this = this;
            if (event == null || event === '') {
                throw new Error('Failed to listen. Argument \'event\' can not be empty');
            }
            var listener = new BroadcastEventListener(event);
            var callback = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.run(function () {
                    var casted = [];
                    if (args.length > 0) {
                        casted = args;
                    }
                    _this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
                    listener.next(args);
                    _this.log('listener next() called.');
                }, _this._configuration.executeEventsInZone);
            };
            this.setListener(callback, listener);
            return listener;
        };
        SignalRConnection.prototype.setListener = function (callback, listener) {
            this.log("SignalRConnection: Starting to listen to server event with name " + listener.event);
            this._jProxy.on(listener.event, callback);
            if (this._listeners[listener.event] == null) {
                this._listeners[listener.event] = [];
            }
            this._listeners[listener.event].push(callback);
        };
        SignalRConnection.prototype.convertTransports = function (transports) {
            if (transports instanceof Array) {
                return transports.map(function (t) { return t.name; });
            }
            return transports.name;
        };
        SignalRConnection.prototype.wireUpErrorsAsObservable = function () {
            var _this = this;
            var sError = new rxjs.Subject();
            this._jConnection.error(function (error) {
                _this.run(function () { return sError.next(error); }, _this._configuration.executeErrorsInZone);
            });
            return sError;
        };
        SignalRConnection.prototype.wireUpStatusEventsAsObservable = function () {
            var _this = this;
            var sStatus = new rxjs.Subject();
            // aggregate all signalr connection status handlers into 1 observable.
            // handler wire up, for signalr connection status callback.
            this._jConnection.stateChanged(function (change) {
                _this.run(function () { return sStatus.next(new ConnectionStatus(change.newState)); }, _this._configuration.executeStatusChangeInZone);
            });
            return sStatus.asObservable();
        };
        SignalRConnection.prototype.onBroadcastEventReceived = function (listener) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.log('SignalRConnection.proxy.on invoked. Calling listener next() ...');
            var casted = null;
            if (args.length > 0) {
                casted = args[0];
            }
            this.run(function () {
                listener.next(casted);
            }, this._configuration.executeEventsInZone);
            this.log('listener next() called.');
        };
        SignalRConnection.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.enabledLogging === false) {
                return;
            }
            // tslint:disable-next-line: no-console
            console.log(args.join(', '));
        };
        SignalRConnection.prototype.run = function (func, inZone) {
            if (inZone) {
                this._zone.run(function () { return func(); });
            }
            else {
                this._zone.runOutsideAngular(function () { return func(); });
            }
        };
        return SignalRConnection;
    }());

    var ConnectionTransport = /** @class */ (function () {
        function ConnectionTransport(name) {
            if (name == null || name === '') {
                throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
            }
            this._name = name;
        }
        Object.defineProperty(ConnectionTransport.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        ConnectionTransport.prototype.toString = function () {
            return this._name;
        };
        ConnectionTransport.prototype.equals = function (other) {
            if (other == null) {
                return false;
            }
            return this._name === other.name;
        };
        return ConnectionTransport;
    }());

    // @dynamic
    var ConnectionTransports = /** @class */ (function () {
        function ConnectionTransports() {
        }
        Object.defineProperty(ConnectionTransports, "foreverFrame", {
            get: function () {
                return ConnectionTransports.transports[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionTransports, "longPolling", {
            get: function () {
                return ConnectionTransports.transports[1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionTransports, "serverSentEvents", {
            get: function () {
                return ConnectionTransports.transports[2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionTransports, "webSockets", {
            get: function () {
                return ConnectionTransports.transports[3];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConnectionTransports, "auto", {
            get: function () {
                return ConnectionTransports.transports[4];
            },
            enumerable: false,
            configurable: true
        });
        return ConnectionTransports;
    }());
    ConnectionTransports.transports = [
        new ConnectionTransport('foreverFrame'),
        new ConnectionTransport('longPolling'),
        new ConnectionTransport('serverSentEvents'),
        new ConnectionTransport('webSockets'),
        new ConnectionTransport('auto'),
    ];

    var SignalRConfiguration = /** @class */ (function () {
        function SignalRConfiguration() {
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
        return SignalRConfiguration;
    }());

    var SIGNALR_JCONNECTION_TOKEN = new i0.InjectionToken('SIGNALR_JCONNECTION_TOKEN');

    var SignalR = /** @class */ (function () {
        function SignalR(configuration, zone, jHubConnectionFn /* use type 'any'; Suggested workaround from angular repository: https://github.com/angular/angular/issues/12631 */) {
            this._configuration = configuration;
            this._zone = zone;
            this._jHubConnectionFn = jHubConnectionFn;
        }
        SignalR.prototype.createConnection = function (options) {
            var configuration = this.merge(options ? options : {});
            this.logConfiguration(configuration);
            // create connection object
            var jConnection = this._jHubConnectionFn(configuration.url);
            jConnection.logging = configuration.logging;
            jConnection.qs = configuration.qs;
            // create a proxy
            var jProxy = jConnection.createHubProxy(configuration.hubName);
            // !!! important. We need to register at least one function otherwise server callbacks will not work.
            jProxy.on('noOp', function () { });
            var hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
            return hubConnection;
        };
        SignalR.prototype.connect = function (options) {
            return this.createConnection(options).start();
        };
        SignalR.prototype.logConfiguration = function (configuration) {
            try {
                var serializedQs = JSON.stringify(configuration.qs);
                var serializedTransport = JSON.stringify(configuration.transport);
                if (configuration.logging) {
                    this.log("Creating connecting with...");
                    this.log("configuration:[url: '" + configuration.url + "'] ...");
                    this.log("configuration:[hubName: '" + configuration.hubName + "'] ...");
                    this.log("configuration:[qs: '" + serializedQs + "'] ...");
                    this.log("configuration:[transport: '" + serializedTransport + "'] ...");
                }
            }
            catch (err) { /* */ }
        };
        SignalR.prototype.log = function (str) {
            // tslint:disable-next-line: no-console
            console.log(str);
        };
        SignalR.prototype.merge = function (overrides) {
            var merged = new SignalRConfiguration();
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
        };
        return SignalR;
    }());
    SignalR.ɵfac = function SignalR_Factory(t) { return new (t || SignalR)(i0__namespace.ɵɵinject(SignalRConfiguration), i0__namespace.ɵɵinject(i0__namespace.NgZone), i0__namespace.ɵɵinject(SIGNALR_JCONNECTION_TOKEN)); };
    SignalR.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: SignalR, factory: SignalR.ɵfac });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(SignalR, [{
                type: i0.Injectable
            }], function () {
            return [{ type: SignalRConfiguration }, { type: i0__namespace.NgZone }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [SIGNALR_JCONNECTION_TOKEN]
                        }] }];
        }, null);
    })();

    var SIGNALR_CONFIGURATION = new i0.InjectionToken('SIGNALR_CONFIGURATION');
    function createSignalr(configuration, zone) {
        var jConnectionFn = getJConnectionFn();
        return new SignalR(configuration, zone, jConnectionFn);
    }
    function getJConnectionFn() {
        var jQuery = getJquery();
        var hubConnectionFn = jQuery.hubConnection;
        if (hubConnectionFn == null) {
            throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
        }
        return hubConnectionFn;
    }
    function getJquery() {
        var jQuery = window.jQuery;
        if (jQuery == null) {
            throw new Error('Signalr failed to initialize. Script \'jquery.js\' is missing. Please make sure to include jquery script.');
        }
        return jQuery;
    }
    function provideSignalr() {
        return new i0.NgZone({});
    }
    var SignalRModule = /** @class */ (function () {
        function SignalRModule() {
        }
        SignalRModule.forRoot = function (getSignalRConfiguration) {
            return {
                ngModule: SignalRModule,
                providers: [
                    {
                        provide: SIGNALR_CONFIGURATION,
                        useFactory: getSignalRConfiguration
                    },
                    {
                        deps: [SIGNALR_CONFIGURATION, i0.NgZone],
                        provide: SignalR,
                        useFactory: (createSignalr)
                    },
                    {
                        provide: i0.NgZone,
                        useFactory: (provideSignalr)
                    }
                ],
            };
        };
        SignalRModule.forChild = function () {
            throw new Error('forChild method not implemented');
        };
        return SignalRModule;
    }());
    SignalRModule.ɵfac = function SignalRModule_Factory(t) { return new (t || SignalRModule)(); };
    SignalRModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: SignalRModule });
    SignalRModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ providers: [{
                provide: SignalR,
                useValue: SignalR
            }] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(SignalRModule, [{
                type: i0.NgModule,
                args: [{
                        providers: [{
                                provide: SignalR,
                                useValue: SignalR
                            }]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of ng2-signalr
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BroadcastEventListener = BroadcastEventListener;
    exports.ConnectionStatus = ConnectionStatus;
    exports.ConnectionStatuses = ConnectionStatuses;
    exports.ConnectionTransport = ConnectionTransport;
    exports.ConnectionTransports = ConnectionTransports;
    exports.SignalR = SignalR;
    exports.SignalRConfiguration = SignalRConfiguration;
    exports.SignalRConnection = SignalRConnection;
    exports.SignalRConnectionMock = SignalRConnectionMock;
    exports.SignalRConnectionMockManager = SignalRConnectionMockManager;
    exports.SignalRModule = SignalRModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-signalr.umd.js.map
