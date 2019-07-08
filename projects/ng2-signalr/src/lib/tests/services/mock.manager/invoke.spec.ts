import { Subject } from 'rxjs';
import { SignalRConnectionMockManager } from '../../../services/testing';
import { BroadcastEventListener } from '../../../services/eventing';


class AServerEvent {
    constructor(public counter: number) {
    }
}


describe('SignalRConnectionMockManager', () => {

    describe('Given mock has an listener', () => {
        let sut: SignalRConnectionMockManager;
        let receivedEvents: AServerEvent[];

        beforeEach(() => {
            receivedEvents = [];
            sut = new SignalRConnectionMockManager();
        });

        function listen() {
            const broadcastListener = new BroadcastEventListener<AServerEvent>('OnMessageSent');
            const listener = sut.mock.listen(broadcastListener);
            const subscription = broadcastListener.subscribe((e: AServerEvent) => {
                receivedEvents.push(e);
            });
            return broadcastListener;
        }

        function fakeEvent(event: AServerEvent) {
            sut.listeners.OnMessageSent.next(event);
        }

        it('the manager should have an "OnMessageSent" invokeListener', () => {
            listen();
            expect(sut.listeners.OnMessageSent instanceof Subject).toBeTruthy();
        });

        it('the manager should have an "OnMessageSent" invokeListener', () => {
            listen();
            listen();
            expect(sut.listeners.OnMessageSent instanceof Subject).toBeTruthy();
        });

        describe('when manager fakes server event once', () => {

            beforeEach(() => {
                listen();
                fakeEvent(new AServerEvent(1));
            });

            it('the mock should have emitted once', () => {
                expect(receivedEvents.length).toBe(1);
                expect(receivedEvents[0]).toEqual(new AServerEvent(1));
            });
        });

        describe('when manager fakes server event twice', () => {

            beforeEach(() => {
                listen();
                fakeEvent(new AServerEvent(1));
                fakeEvent(new AServerEvent(2));
            });

            it('the mock should have emitted twice', () => {
                expect(receivedEvents.length).toBe(2);
                expect(receivedEvents[0]).toEqual(new AServerEvent(1));
                expect(receivedEvents[1]).toEqual(new AServerEvent(2));
            });
        });

        describe('when manager fakes server events', () => {

            beforeEach(() => {
                listen();
                fakeEvent(new AServerEvent(1));
                fakeEvent(new AServerEvent(2));
            });

            it('the mock should have emitted twice', () => {
                expect(receivedEvents.length).toBe(2);
                expect(receivedEvents[0]).toEqual(new AServerEvent(1));
                expect(receivedEvents[1]).toEqual(new AServerEvent(2));
            });
        });
    });
});

