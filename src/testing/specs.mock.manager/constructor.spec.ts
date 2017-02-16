import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { SignalRConnectionMockManager } from './../signalr.connection.mock.manager';
import { SignalRConnectionBase } from '../../connection/signalr.connection.base';
import { ConnectionStatus } from '../../connection/connection.status';
import { ConnectionStatuses } from '../../connection/connection.statuses';

describe('SignalRConnectionMockManager', () => {

    it('constructor should initialize', () => {
        let sut = new SignalRConnectionMockManager();
        expect(sut.errors$ instanceof Subject).toBeTruthy();
        expect(sut.status$ instanceof Subject).toBeTruthy();
        expect(sut.mock instanceof SignalRConnectionBase).toBeTruthy();
    });
});

