import { SignalRConfiguration } from "../../index";
import { ConnectionTransports } from '../../src/services/connection/connection.transports';

describe('SignalRConfiguration', () => {

    it('constructor should set defaults', () => {
        let configuration = new SignalRConfiguration();
        expect(configuration.logging).toBe(false, 'logging should be false');
        expect(configuration.hubName).toBe(null);
        expect(configuration.qs).toBe(null);
        expect(configuration.url).toBe(null);
        expect(configuration.transport).toBe(ConnectionTransports.auto, 'transport should be set to auto');
        expect(configuration.executeEventsInZone).toBe(true);
        expect(configuration.executeStatusChangeInZone).toBe(true);
        expect(configuration.executeErrorsInZone).toBe(false);
        expect(configuration.pingInterval).toBe(300000);
    });
});
