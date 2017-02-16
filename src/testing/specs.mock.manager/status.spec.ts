import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { SignalRConnectionMockManager } from './../signalr.connection.mock.manager';
import { SignalRConnectionBase } from '../../connection/signalr.connection.base';
import { ConnectionStatus } from '../../connection/connection.status';
import { ConnectionStatuses } from '../../connection/connection.statuses';

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
                fakeEvent(ConnectionStatuses.reconnected);
                fakeEvent(ConnectionStatuses.connectionSlow); 
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
                fakeEvent(ConnectionStatuses.connectionSlow);
            });

            it('the mock should have emitted once', () => {
                expect(actualStatusses.length).toBe(1);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.connectionSlow);
            });
        });

        describe('when manager fakes status event twice', () => {

             beforeEach(() => {
                subscribe();
                fakeEvent(ConnectionStatuses.connectionSlow);
                fakeEvent(ConnectionStatuses.disconnected); 
            });

            it('the mock should have emitted twice', () => {
                expect(actualStatusses.length).toBe(2);
                expect(actualStatusses[0]).toEqual(ConnectionStatuses.connectionSlow);
                expect(actualStatusses[1]).toEqual(ConnectionStatuses.disconnected);
            });
        });
    });
});

