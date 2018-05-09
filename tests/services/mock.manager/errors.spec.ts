import { Observable, ReplaySubject, Subject } from 'rxjs';
import { SignalRConnectionMockManager } from '../../../src/services/testing/signalr.connection.mock.manager';

describe('SignalRConnectionMockManager', () => {

    describe('Given mock has an error subscriber', () => {
        let sut: SignalRConnectionMockManager;
        let actualErrors: any[];

        beforeEach(() => {
            actualErrors = [];
            sut = new SignalRConnectionMockManager();
        });

        function subscribe() {
            sut.mock.errors.subscribe((error: any) => {
                actualErrors.push(error);
            });
        }

        function fakeEvent(error: any) {
            sut.errors$.next(error);
        }

        describe('when manager fakes events', () => {

            beforeEach(() => {
                fakeEvent('error 1');
                fakeEvent('error 2');
                subscribe();
                fakeEvent('error 3');
            });

            it('the mock should have emitted only events after subscription', () => {
                expect(actualErrors.length).toBe(1);
                expect(actualErrors[0]).toEqual('error 3');
            });
        });

        describe('when manager fakes error event once', () => {

            beforeEach(() => {
                subscribe();
                fakeEvent('error 1');
            });

            it('the mock should have emitted once', () => {
                expect(actualErrors.length).toBe(1);
                expect(actualErrors[0]).toBe('error 1');
            });
        });

        describe('when manager fakes error event twice', () => {

            beforeEach(() => {
                subscribe();
                fakeEvent('error 1');
                fakeEvent('error 2');
            });

            it('the mock should have emitted twice', () => {
                expect(actualErrors.length).toBe(2);
                expect(actualErrors[0]).toBe('error 1');
                expect(actualErrors[1]).toBe('error 2');
            });
        });
    });
});

