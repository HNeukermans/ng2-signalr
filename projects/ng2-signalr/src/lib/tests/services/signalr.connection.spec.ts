import { NgZone } from '@angular/core';
import { JConnectionStub, JHubProxyStub } from './jConnection.stub';
import { SignalRConnection, SignalRConfiguration, BroadcastEventListener } from 'ng2-signalr';


describe('Connection', () => {

    let zone: NgZone, jConnectionStub: JConnectionStub;
    let connection: SignalRConnection;
    let hubProxy: JHubProxyStub;

    beforeEach(() => {
        zone = new NgZone({ enableLongStackTrace: true });
        jConnectionStub = new JConnectionStub();
        hubProxy = new JHubProxyStub();
    });

    it('id should get jConnection-id', () => {
        const connection = new SignalRConnection(jConnectionStub, hubProxy, zone, new SignalRConfiguration());
        expect(connection.id).toBe(jConnectionStub.id);
    });

    it('listen should proxy on listener event', () => {
        // arrange
        spyOn(hubProxy, 'on');
        const connection = new SignalRConnection(jConnectionStub, hubProxy, zone, new SignalRConfiguration());
        const listener = new BroadcastEventListener<any>('OnMessageSent');
        // act
        connection.listen(listener);
        // assert
        expect(hubProxy.on).toHaveBeenCalledWith(listener.event, jasmine.any(Function));
    });

    it('listenFor should proxy on event', () => {
        // arrange
        spyOn(hubProxy, 'on');
        const connection = new SignalRConnection(jConnectionStub, hubProxy, zone, new SignalRConfiguration());
        // act
        const listener = connection.listenFor<any>('OnMessageSent');
        // assert
        expect(hubProxy.on).toHaveBeenCalledWith('OnMessageSent', jasmine.any(Function));
        expect(listener.event).toBe('OnMessageSent');
    });

    it('listenFor should throw when event is empty', () => {
        // arrange
        const connection = new SignalRConnection(jConnectionStub, hubProxy, zone, new SignalRConfiguration());
        // act
        const action1 = () => connection.listenFor<any>('');
        const action2 = () => connection.listenFor<any>(null);
        // assert
        expect(action1).toThrow();
        expect(action2).toThrow();
    });
});
