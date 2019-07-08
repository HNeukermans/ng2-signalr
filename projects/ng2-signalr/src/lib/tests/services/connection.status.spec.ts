import { ConnectionStatus } from '../../services/connection/connection.status';

describe('ConnectionStatus', () => {

    it('constructor should set name', () => {
        const status = new ConnectionStatus(0);
        expect(status.name).toBe('connecting');
    });

    it('constructor should set name', () => {
            const status = new ConnectionStatus(1);
            expect(status.name).toBe('connected');
    });

    it('constructor should set name', () => {
            const status = new ConnectionStatus(2);
            expect(status.name).toBe('reconnecting');
    });


    it('constructor should set name', () => {
            const status = new ConnectionStatus(4);
            expect(status.name).toBe('disconnected');
    });


    it('toString() should be name', () => {
        const event = new ConnectionStatus(0);
        expect(event.toString()).toBe(event.name);
    });

    it('equal should compare names', () => {
        const status1 = new ConnectionStatus(0);
        const status2 = new ConnectionStatus(0);
        const status3 = new ConnectionStatus(2);
        expect(status1.equals(status2)).toBe(true);
        expect(status1.equals(status3)).toBe(false);
    });

    it('constructor should throw when name is null', () => {
        const action = () => new ConnectionStatus(null);
        expect(action).toThrow();
    });


});
