import { Observable, ReplaySubject, Subject } from 'rxjs';
import { SignalRConnectionMockManager } from '../../../src/services/testing/signalr.connection.mock.manager';
import { ConnectionStatus } from '../../../src/services/connection/connection.status';
import { ConnectionStatuses } from '../../../src/services/connection/connection.statuses';
import {  } from 'jasmine';

describe('SignalRConnectionMockManager', () => {

    let sut: SignalRConnectionMockManager;
    let actualStatusses: ConnectionStatus[];

    beforeEach(() => {
        actualStatusses = [];
        sut = new SignalRConnectionMockManager();
    });

    function subscribe() {
        sut.mock.status.subscribe((status: ConnectionStatus) => {
            actualStatusses.push(status);
        });
    }

    function fakeEvent(status: ConnectionStatus) {
        sut.status$.next(status);
    }

    describe('Given mock has a status subscriber', () => {

        describe('when manager fakes events', () => {

            beforeEach(() => {
                fakeEvent(ConnectionStatuses.connecting);
                fakeEvent(ConnectionStatuses.connected);
                subscribe();
                fakeEvent(ConnectionStatuses.disconnected);
            });

            it('the mock should have emitted only events after subscription', () => {
                expect(actualStatusses.length).toBe(1);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.disconnected);
            });
        });

        describe('when manager fakes status event once', () => {

            beforeEach(() => {
                subscribe();
                fakeEvent(ConnectionStatuses.reconnecting);
            });

            it('the mock should have emitted once', () => {
                expect(actualStatusses.length).toBe(1);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.reconnecting);
            });
        });

        describe('when manager fakes status event twice', () => {

            beforeEach(() => {
                subscribe();
                fakeEvent(ConnectionStatuses.reconnecting);
                fakeEvent(ConnectionStatuses.disconnected);
            });

            it('the mock should have emitted twice', () => {
                expect(actualStatusses.length).toBe(2);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.reconnecting);
                expect(actualStatusses[1]).toEqual(ConnectionStatuses.disconnected);
            });
        });
    });
});
