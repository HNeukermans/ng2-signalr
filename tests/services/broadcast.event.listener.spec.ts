
import { BroadcastEventListener } from "../../src/services/index";

describe('BroadcastEventListener', () => {

    interface Type {
        order: number;
    };

    it('constructor should set event', () => {
        let l = new BroadcastEventListener<Type>('UserConnected');
        expect(l.event).toBe('UserConnected');
    });

    it('constructor should throw when event is null', () => {
        let action = () => new BroadcastEventListener<Type>(null);
        expect(action).toThrow();
    });

    it('constructor should throw when event is empty', () => {
        let action = () => new BroadcastEventListener<Type>('');
        expect(action).toThrow();
    });

    describe('Given a subscriber', () => {
        let sut: BroadcastEventListener<Type>;
        let actualEvents: Type[];

        beforeEach(() => {
            sut = new BroadcastEventListener<Type>('UserConnected');
            actualEvents = [];
            sut.subscribe((event: Type) => {
                actualEvents.push(event);
            });
        });

        describe('when publishing once', () => {

            beforeEach(() => {
                sut.next({ order: 1 });
            });

            it('listener should have emitted once', () => {
                expect(actualEvents.length).toBe(1);
                expect(actualEvents[0]).toEqual({ order: 1 });
            });
        });

        describe('when publishing twice', () => {

            beforeEach(() => {
                sut.next({ order: 1 });
                sut.next({ order: 2 });
            });

            it('listener should have emitted twice', () => {
                expect(actualEvents.length).toBe(2);
                expect(actualEvents[0]).toEqual({ order: 1 });
                expect(actualEvents[1]).toEqual({ order: 2 });
            });
        });
    });

    describe('Given a listener that publishes events', () => {
        let sut: BroadcastEventListener<Type>;
        let actualEvents: Type[];

        beforeEach(() => {
            sut = new BroadcastEventListener<Type>('UserConnected');
            sut.next({ order: 1 }); // fire before subscribe
            sut.next({ order: 2 }); // fire before subscribe
            actualEvents = [];
        });

        describe('when an observer subscribes after the events', () => {

            beforeEach(() => {
                // subscribe after the event happened         
                sut.subscribe((event: Type) => {
                    actualEvents.push(event);
                });
                sut.next({ order: 3 });
            });

            it('listener should not have replayed the events', () => {
                expect(actualEvents.length).toBe(1);
                expect(actualEvents[0]).toEqual({ order: 3 });
            });
        });
    });


});
