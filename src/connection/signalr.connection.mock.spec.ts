import { SignalRConnectionMock } from "./signalr.connection.mock";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ConnectionStatuses } from "./connection.statuses";
import { ConnectionStatus } from "./connection.status";

describe("SignalRConnectionMock", () => {

    it("constructor should initialize", () => {
        let sut = new SignalRConnectionMock();
        expect(sut.errors$).not.toBeNull();
        expect(sut.errors).not.toBeNull();
        expect(sut.status$).not.toBeNull();
        expect(sut.status).not.toBeNull();
    });

    describe("mocking status", () => {

        class StatusListener {
            public result: ConnectionStatus[];
            constructor() {
                this.result = [];
            }
            public listen() {
                let _self = this; /*make use of closure, to keep 'this' refencered*/
                return function (status: ConnectionStatus) {
                    _self.result.push(status);
                };
            }
        }

        let sut: SignalRConnectionMock;
        let listener: StatusListener;

        beforeEach(() => {
            listener = new StatusListener();
            sut = new SignalRConnectionMock();
            sut.status.subscribe(listener.listen());
        });

        it("mock x1 time should dispatch single event", () => {
            sut.status$.next(ConnectionStatuses.Starting);

            expect(listener.result.length).toBe(1);
            expect(listener.result[0]).toBe(ConnectionStatuses.Starting);
        });

        it("mock x2 times should dispatch 2 events in order", () => {
            sut.status$.next(ConnectionStatuses.Starting);
            sut.status$.next(ConnectionStatuses.ConnectionSlow);
            expect(listener.result.length).toBe(2);
            expect(listener.result[0]).toBe(ConnectionStatuses.Starting);
            expect(listener.result[1]).toBe(ConnectionStatuses.ConnectionSlow);
        });
    });

    
    describe("mocking error query", () => {

        let sut: SignalRConnectionMock;
        let expectedError: any;
        let actualResponse: any = null, actualError: any = null;
        let querySpy: ArrangedQuery = null;
        
        beforeEach(() => {
            sut = new SignalRConnectionMock();
            expectedError = "Oops. Error occcured.";
            querySpy = sut.whenQuery("getUsers").respondWithError(expectedError);
        });

        beforeEach((done) => {
            debugger;
            sut.query("getUsers").then((response) => {
                actualResponse = response;
                done();
            }, (error) => {
                actualError = error;
                done();
            });
        });

        it("query should not resolve", () => {
            expect(actualResponse).toBe(null);
        });

        it("query should reject with error", () => {
            expect(actualError).toBe(expectedError);
        });

        it("query should have been called", () => {
            expect(querySpy.hasBeenCalled).toBe(true);
        });

        it("query should have been called once", () => {
            expect(querySpy.hasBeenCalledNumberOfTimes).toBe(1);
        });
    });

    describe("mocking error command", () => {

        let sut: SignalRConnectionMock;
        let expectedError: any;
        let actualResponse: any = null, actualError: any = null;
        let commandSpy: ArrangedQuery = null;
        let payload =  { name : "hannes", profession : "developer" };
        
        beforeEach(() => {
            sut = new SignalRConnectionMock();
            expectedError = "Oops. Error occcured.";
            commandSpy = sut.whenCommand("createUser").respondWithError(expectedError);
        });

        beforeEach((done) => {
            debugger;
            sut.command("createUser", payload).then((response) => {
                actualResponse = response;
                done();
            }, (error) => {
                actualError = error;
                done();
            });
        });

        it("command should not resolve", () => {
            expect(actualResponse).toBe(null);
        });

        it("command should reject with error", () => {
            expect(actualError).toBe(expectedError);
        });

        it("command should have been called", () => {
            expect(commandSpy.hasBeenCalled).toBe(true);
        });

        it("command should have been called once", () => {
            expect(commandSpy.hasBeenCalledNumberOfTimes).toBe(1);
        });
    });

});

