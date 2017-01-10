import { inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import { Title } from './title';
import { Observable } from 'rxjs/Observable';
import { SignalRConnectionMock } from 'ng2-signalr';
import { MockActivatedRoute } from './activated.route.mock';
import { Parameters } from './parameters';
import { BroadcastEvents } from './BroadcastEvents';

describe('Home', () => {

  let connectionMock = new SignalRConnectionMock();
  let activatedRouteMock = new MockActivatedRoute();
  activatedRouteMock.snapshot.data = { 'connection': connectionMock };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeComponent,
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });
  });

  beforeEach(inject([HomeComponent], (home: HomeComponent) => {
    home.ngOnInit();
  }));

  it('init should observe connection errors and status',
    inject([HomeComponent], (home: HomeComponent) => {

      expect(connectionMock.errors$.observers.length).toBe(1);
      expect(connectionMock.status$.observers.length).toBe(1);
    }));

  it('getSpeakers() should invoke getCoreTeam',
    inject([HomeComponent], (home: HomeComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

      home.getSpeakers();

      expect(connectionMock.invoke).toHaveBeenCalledWith('GetNgBeSpeakers');
    }));

  it('getSpeakers() should bind data to speakers',
    fakeAsync(inject([HomeComponent], (home: HomeComponent) => {

        const data = ['Igor'];
        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(data));

        home.getSpeakers();
        tick();
        expect(home.speakers).toBe(data);
      })));

  it('getCoreTeam() should invoke GetNgBeCoreTeam',
    inject([HomeComponent], (home: HomeComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(['Jurgen']));

      home.getCoreTeam();

      expect(connectionMock.invoke)
        .toHaveBeenCalledWith('GetNgBeCoreTeam', jasmine.any(Parameters));
    }));

  it('getCoreTeam() should bind data to members',
    fakeAsync(inject([HomeComponent], (home: HomeComponent) => {

        const data = ['Jurgen'];
        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve(data));

        home.getCoreTeam();
        tick();
        expect(home.members).toBe(data);
      })));

  it('invokeFailingMethod() should invoke ThrowException',
    inject([HomeComponent], (home: HomeComponent) => {

        spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

        home.invokeFailingMethod();

        expect(connectionMock.invoke).toHaveBeenCalledWith('ThrowException');
      }));

  it('invokeFailingMethod() should log to console upon reject',
    fakeAsync(inject([HomeComponent], (home: HomeComponent) => {

        spyOn(connectionMock, 'invoke').and.returnValue(Promise.reject({}));
        spyOn(console, 'log');

        home.invokeFailingMethod();
        tick();

        expect(console.log).toHaveBeenCalled();
      })));

  it('chat() should invoke Chat with message',
    inject([HomeComponent], (home: HomeComponent) => {

      spyOn(connectionMock, 'invoke').and.returnValue(Promise.resolve([]));

      home.message = 'My message';
      home.chat();

      expect(connectionMock.invoke)
        .toHaveBeenCalledWith('Chat', jasmine.objectContaining({ content: home.message }));
    }));

  it('stop() should stop the connection',
    inject([HomeComponent], (home: HomeComponent) => {

      spyOn(connectionMock, 'stop').and.callThrough();

      home.ngOnInit();
      home.stop();

      expect(connectionMock.stop).toHaveBeenCalled();
    }));

  fit('listenForMessages() should listen for broadcast event',
    inject([HomeComponent], (home: HomeComponent) => {

      spyOn(connectionMock, 'listen').and.callThrough();

      home.listenForMessages();

      expect(connectionMock.listen)
        .toHaveBeenCalledWith(jasmine.objectContaining({ event: BroadcastEvents.ON_MESSAGE_SENT }));

      expect(connectionMock.listeners[BroadcastEvents.ON_MESSAGE_SENT].observers.length)
        .toBe(1);
      //expect(connectionMock.listeners[BroadcastEvents.ON_MESSAGE_SENT]).not.toBeNull();
      //expect(connectionMock.listeners[BroadcastEvents.ON_MESSAGE_SENT]).not.toBeNull();

    }));


  // it('should have a title', inject([ HomeComponent ], (home: HomeComponent) => {
  //   expect(!!home.title).toEqual(true);
  // }));


});
