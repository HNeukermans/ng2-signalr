import { SignalRConnectionMock } from './signalr.connection.mock';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ConnectionStatuses } from './connection.statuses';
import { ConnectionStatus } from './connection.status';
import { SignalRConnectionBase } from './signalr.connection.base';
import { Subject } from 'rxjs/Subject';

describe('SignalRConnectionMock', () => {

    it('constructor should initialize', () => {
        let sut = new SignalRConnectionMock();
        expect(sut.errors$ instanceof Subject).toBeTruthy();
        expect(sut.status$ instanceof Subject).toBeTruthy();
        expect(sut.fakeConnection instanceof SignalRConnectionBase).toBeTruthy();
    });

    describe('Given fake-connection has an error subscriber', () => {
        let sut: SignalRConnectionMock;
        let actualErrors: any[];

        beforeEach(() => {
            sut = new SignalRConnectionMock();
            actualErrors = [];
            sut.fakeConnection.errors.subscribe((error) => {
                actualErrors.push(error);
            });
        });

        describe('when an error is faked once', () => {

            beforeEach(() => {
                sut.errors$.next('An error occured');
            });

            it('the fake connection should have emitted once', () => {
                expect(actualErrors.length).toBe(1);
                expect(actualErrors[0]).toBe('An error occured');
            });
        });

        describe('when an error is faked twice', () => {

            beforeEach(() => {
                sut.errors$.next('An error occured');
                sut.errors$.next('A second error occured');
            });

            it('the fake connection should have emitted twice', () => {
                expect(actualErrors.length).toBe(2);
                expect(actualErrors[0]).toBe('An error occured');
                expect(actualErrors[1]).toBe('A second error occured');
            });
        });
    });

    describe('Given fake-connection has a status subscriber', () => {
        let sut: SignalRConnectionMock;
        let actualStatusses: ConnectionStatus[];

        beforeEach(() => {
            sut = new SignalRConnectionMock();
            actualStatusses = [];
            sut.fakeConnection.status.subscribe((status: ConnectionStatus) => {
                actualStatusses.push(status);
            });
        });

        describe('when status is faked once', () => {

            beforeEach(() => {
                sut.status$.next(ConnectionStatuses.ConnectionSlow);
            });

            it('the fake connection should have emitted once', () => {
                expect(actualStatusses.length).toBe(1);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.ConnectionSlow);
            });
        });

        describe('when status is faked twice', () => {

            beforeEach(() => {
                sut.status$.next(ConnectionStatuses.ConnectionSlow);
                sut.status$.next(ConnectionStatuses.Disconnected);
            });

            it('the fake connection should have emitted twice', () => {
                expect(actualStatusses.length).toBe(2);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.ConnectionSlow);
                expect(actualStatusses[1]).toEqual(ConnectionStatuses.Disconnected);
            });
        });
    });
});

