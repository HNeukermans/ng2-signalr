import { Subject } from 'rxjs';
import { SignalRConnectionMockManager, SignalRConnectionMock } from 'ng2-signalr';

describe('SignalRConnectionMockManager', () => {

    it('constructor should initialize', () => {
        let sut = new SignalRConnectionMockManager();
        expect(sut.errors$ instanceof Subject).toBeTruthy();
        expect(sut.status$ instanceof Subject).toBeTruthy();
        expect(sut.mock instanceof SignalRConnectionMock).toBeTruthy();
    });
});

