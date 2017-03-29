import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { SignalRConnectionMockManager, SignalRConnectionBase } from "../../../src/services/index";

describe('SignalRConnectionMockManager', () => {

    it('constructor should initialize', () => {
        let sut = new SignalRConnectionMockManager();
        expect(sut.errors$ instanceof Subject).toBeTruthy();
        expect(sut.status$ instanceof Subject).toBeTruthy();
        expect(sut.mock instanceof SignalRConnectionBase).toBeTruthy();
    });
});

