
[![npm version](https://badge.fury.io/js/ng2-signalr.svg)](https://badge.fury.io/js/ng2-signalr)
![live demo](https://img.shields.io/badge/demo-live-orange.svg)
[![Coverage Status](https://coveralls.io/repos/github/HNeukermans/ng2-signalr/badge.svg?branch=master)](https://coveralls.io/github/HNeukermans/ng2-signalr?branch=master)
[![Build Status](https://travis-ci.org/HNeukermans/ng2-signalr.svg?branch=master)](https://travis-ci.org/HNeukermans/ng2-signalr)
# ng2-signalr
An angular typescript library that allows you to connect to Asp.Net SignalR

## Features:
 1. 100% typescript
 2. use rxjs to observe server events 
 3. write unit tests easy using the provided SignalrConnectionMockManager & ActivatedRouteMock

## [ng2-signalr live demo](http://ng2-signalr-webui.azurewebsites.net)
![ng2-signalr](https://cloud.githubusercontent.com/assets/2285199/22845870/f8cdaff4-efe4-11e6-905d-a471a998125a.gif)
source: [ng2 signalr demo](https://github.com/HNeukermans/ng2-signalr.demo.webui.systemjs) <br>
demo : [demo](http://ng2-signalr-webui.azurewebsites.net) (can take longer to load. Sorry, azure free tier :-))<br>
ng cli example: [ng cli example](https://github.com/HNeukermans/ng2-signalr.demo.webui.ngcli) <br>
## Installation
```
npm install ng2-signalr jquery signalr --save
```

## Breaking changes
v2.0.6
going from <2.0.6 to 2.0.6
ConnectionStatus refactoring
  1. removed ConnectionStatus.starting
  2. removed ConnectionStatus.received
  3. removed ConnectionStatus.connectionSlow
  4. removed ConnectionStatus.reconnected
  5. removed ConnectionStatus.stateChanged


v2.0.0
going from 1.0.X to 2.0.0 there will be some breaking changes. 

type renames:
  1. ConnectionOptions to IConnectionOptions
  2. ListenerCollection to IListenerCollection 
  3. SignalRConnectionBase to ISignalRConnection
  
configuration: <br>
  4. SignalRModule.configure(c: SingalRConfiguration) to SignalR.forRoot(() => SingalRConfiguration);

## Setup
inside app.module.ts
```
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

// v2.0.0
export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'Ng2SignalRHub';
  c.qs = { user: 'donald' };
  c.url = 'http://ng2-signalr-backend.azurewebsites.net/';
  c.logging = true;
  return c;
}


@NgModule({
  imports: [ 
    SignalRModule.forRoot(createConfig)
  ]
})

// v1.0.9
const config = new SignalRConfiguration();
config.hubName = 'Ng2SignalRHub';
config.qs = { user: 'donald' };
config.url = 'http://ng2-signalr-backend.azurewebsites.net/';

@NgModule({
  imports: [ 
    SignalRModule.configure(config)
  ]
})
```

## setup ngcli
inside angular-cli.json
```
"scripts": [
          "../node_modules/jquery/dist/jquery.min.js",
          "../node_modules/signalr/jquery.signalR.js"
],
```

## Create connection 
There exist 2 ways to create a connection: 
### 1. inject connection
This approach is preferable. You can easily  rely on the default router navigation events (NavigationStart/End) to keep your user busy while the connection establishment is ongoing. Secondly you can inject the connection directly, facilitating easier unit testing. 
Setup involves 3 steps. 
```
// 1. if you want your component code to be testable, it is best to use a route resolver and make the connection there
import { Resolve } from '@angular/router';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionResolver implements Resolve<SignalRConnection> {

    constructor(private _signalR: SignalR)  { }

    resolve() {
        console.log('ConnectionResolver. Resolving...');
        return this._signalR.connect();
    }
}

// 2. use the resolver to resolve 'connection' when navigation to the your page/component
import { Route } from '@angular/router';
import { DocumentationComponent } from './index';
import { ConnectionResolver } from './documentation.route.resolver';

export const DocumentationRoutes: Route[] = [
	{
		path: 'documentation',
    component: DocumentationComponent,
     resolve: { connection: ConnectionResolver }
	}
];

// 3. then inside your component
 export class ChatComponent {
  private _connection: SignalRConnection;

  constructor(route: ActivatedRoute) {    
  }
  
  ngOnInit() {
      this.connection = this.route.snapshot.data['connection'];
  }
  
}    
```
### 2. inject signalr
Creating a client-server connection can be done by calling the connect method on the Signalr instance.
```
// inside your component.
constructor(private _signalR: SignalR)  {
}

someFunction() {
    this._signalR.connect().then((c) => {
      //do stuff
    });
    
    
    
}
```
This approach has several drawbacks:
WaitTime: 
 - Take into account, it can take several second to establish connection with the server and thus for the promise to resolve. This is especially true when a websocket-transport connection is not possible and signalr tries to fallback to other transports like serverSentEevents and long polling. Is it adviceable to keep your end user aware by showing some form of progress.   
More difficult to unit test:
 - If you want to write unit tests against the connection, you need to mock Signalr instance first. 

### listen to connectionstatus changes during connect (>= v2.0.6)
From version 2.0.6 onwards you can subscribe to connectionstatus changes upon connecting to the server.
Forst you ask signalr to create a connection. Then on the connection object you can subscribe to the status observable before calling 
the start method.

FYI: connect() is now shorthand for createConnection().start(), meaning without subscribing to status changes 
```
let conx = this._signalR.createConnection();
conx.status.subscribe((s) => console.warn(s.name));
conx.start().then((c) => {
...
});
```


## Configuration
You can configure Singalr on 2 different levels: 
#### 1. Module level: 
The module level, is where you typically provide the default configuration. This is were you pass in the default hubname, serverurl, qs (query string parameters), and transport. When, somewhere in your application, Singalr.connect() method is invoked without parameters, it will use this default configuration. 
```
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration, ConnectionTransport } from 'ng2-signalr';

// <= v1.0.9
const config = new SignalRConfiguration();
config.hubName = 'Ng2SignalRHub';  //default
config.qs = { user: 'donald' };
config.url = 'http://ng2-signalr-backend.azurewebsites.net/';
// Specify one Transport: config.transport = ConnectionTransports.longPolling; or fallback options with order like below. Defaults to best avaliable connection.
config.transport = [ConnectionTransports.webSockets, ConnectionTransports.longPolling];

@NgModule({
  imports: [ 
    SignalRModule.configure(config)
  ]
})
...

Signalr.connect(); //HERE: module level configuration is used when trying to connect
```
#### 2. Connection level: 
You can always configure signalr on a per connection level. For this, you need to invoke Singalr.connect(options) method, passing in an options parameter, of type ConnectionOptions. Behind the scenes, Signalr connect method will merge the provided options parameter, with the default (module) configuration, into a new configuration object, and pass that to signalr backend. 
```
import { SignalRModule } from 'ng2-signalr';
import { IConnectionOptions, SignalR } from 'ng2-signalr';

let options: IConnectionOptions = { hubName: 'MyHub' };
Signalr.connect(options);
```



## How to listen for server side events
```
// 1.create a listener object
let onMessageSent$ = new BroadcastEventListener<ChatMessage>('ON_MESSAGE_SENT');
 
// 2.register the listener
this.connection.listen(onMessageSent$);
 
// 3.subscribe for incoming messages
onMessageSent$.subscribe((chatMessage: ChatMessage) => {
       this.chatMessages.push(chatMessage);
});
```
### listenFor shorthand:
 When using listenFor method, you can skip the first step in the approach above. Here the listen method returns you the BroadvastEventListener, that you can then subscribe to.
```
let onMessageSent$  = this.connection.listenFor('ON_MESSAGE_SENT');
onMessageSent$.subscribe( ...
```
## How to invoke a server method
```
// invoke a server side method
this.connection.invoke('GetNgBeSpeakers').then((data: string[]) => {
     this.speakers = data;
});

// invoke a server side method, with parameters
this.connection.invoke('ServerMethodName', new Parameters()).then((data: string[]) => {
     this.members = data;
});
``` 
 
## How to listen for connection status
```
this.connection.status.subscribe((status: ConnectionStatus) => {
     this.statuses.push(status);
});
```

## Also supported 
```
// start/stop the connection
this.connection.start();
this.connection.stop();
 
// listen for connection errors
this.connection.errors.subscribe((error: any) => {
     this.errors.push(error);
});
```
## Unit testing
Ng2-signalr comes with a component, specifically built, for making your unit tests easy to write and with few lines of code: SignarlMockManager. The 'SignarlMockManager', can be asked a mocked implementation of your signalr client connection, be using its mock property. The mock connection it's interface is identical to any real signalr connection, that you get back from the Signarl.connect() method. You can use the mock to spy on certain method calls, and verify invocations in your tests. Also, on the mockmanager itself, you will find methods to trigger 'server' like behavior. Both errors$ and status$ properties, can be used for this, and simulate server errors or connectionstatus changes. For more information about, the signarl connection lifecycle, I refer to the [official documentation](https://docs.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/handling-connection-lifetime-events), section Transport disconnection scenarios. Also, the listeners property on the MockManager, holds a collection of all client-server method observers, returned as rxjs subjects. These subject can then be used to simulate a server message being sent over the wire.   

```
 it('I want to simulate an error or status event, in my unit test',
    inject([ChatComponent], (component: ChatComponent) => {

      connectionMockManager.errors$.next('An error occured');  //triggers the connection.error.subscribe(() => {});
      connectionMockManager.status$.next(ConnectionStatuses.slowConnection); //triggers the connection.status.subscribe(() => {});
      ....

}));

it('I want to simulate several ChatMessages received, in my unit test',
    inject([ChatComponent], (component: ChatComponent) => {

      let publisher = connectionMockManager.listeners['OnMessageSent'];

      publisher.next(new ChatMessage('Hannes', 'a message')); //triggers the BroadcastEventListener.subscribe(() => {});
      publisher.next(new ChatMessage('Hannes', 'a second message')); // ''

      expect(component.chatMessages).toEqual([
            new ChatMessage('Hannes', 'a message'),
            new ChatMessage('Hannes', 'a second message')
          ]);
}));

```
For more info, certainly check out the live demo, unit testing section.



## Detailed webpack install
```
npm install jquery signalr expose-loader --save

//inside vendor.ts
import 'expose-loader?jQuery!jquery';
import '../node_modules/signalr/jquery.signalR.js';
```

### Detailed systemjs install (starting from v2.0.0)
```
 {
   'ng2-signalr' : 'node_modules/ng2-signalr/bundles/ng2-singalr.umd.(?min).js'
 }
```

>>>>>>> af93c8777fb64c74f74a875e5da60a168f410e06

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. 

## Contributing

Pull requests are welcome!

## Building

Use `tsc` to compile and build. A `/dist` folder is generated.


##TODO: Code coverage

Use `npm test` cmd to compile and run all tests. 

## Unit testing

Use `npm test` cmd to compile and run all tests. Test runner is configured with autowatching and 'progress' as test reporter. 

  
