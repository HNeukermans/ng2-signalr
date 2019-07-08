import { Subject } from 'rxjs';
import { SignalRConnectionMockManager, SignalRConnectionMock } from '../../../services/testing';

describe('SignalRConnectionMockManager', () => {

    it('constructor should initialize', () => {
        const sut = new SignalRConnectionMockManager();
        expect(sut.errors$ instanceof Subject).toBeTruthy();
        expect(sut.status$ instanceof Subject).toBeTruthy();
        expect(sut.mock instanceof SignalRConnectionMock).toBeTruthy();
    });
});

