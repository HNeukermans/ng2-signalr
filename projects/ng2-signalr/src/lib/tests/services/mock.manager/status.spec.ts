
import {  } from 'jasmine';
import { SignalRConnectionMockManager, ConnectionStatus, ConnectionStatuses } from 'ng2-signalr';

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
