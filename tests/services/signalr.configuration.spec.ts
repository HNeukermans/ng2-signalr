import { SignalRConfiguration } from "../../index";

describe('SignalRConfiguration', () => {

    it('constructor should set defaults', () => {
        let configuration = new SignalRConfiguration();
        expect(configuration.logging).toBe(false, 'logging should be false');
        expect(configuration.hubName).toBe(null);
        expect(configuration.qs).toBe(null);
        expect(configuration.url).toBe(null);
        expect(configuration.transport).toBe(null, 'transport should be null');
    });
});


