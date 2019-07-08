import { ConnectionTransport } from '../../services/connection/connection.transport';

describe('ConnectionTransport', () => {

    it('constructor should set name', () => {
        const transport = new ConnectionTransport('auto');
        expect(transport.name).toBe('auto');
    });

    it('toString() should be name', () => {
        const transport = new ConnectionTransport('auto');
        expect(transport.toString()).toBe(transport.name);
    });

    it('equal should compare names', () => {
        const transport1 = new ConnectionTransport('auto');
        const transport2 = new ConnectionTransport('auto');
        const transport3 = new ConnectionTransport('longPolling');
        expect(transport1.equals(transport2)).toBe(true);
        expect(transport1.equals(transport3)).toBe(false);
    });

    it('constructor should throw when name is null', () => {
        const transport = () => new ConnectionTransport(null);
        expect(transport).toThrow();
    });

    it('constructor should throw when name is empty', () => {
        const transport = () => new ConnectionTransport('');
        expect(transport).toThrow();
    });

});
