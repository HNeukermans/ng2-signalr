
[![npm version](https://badge.fury.io/js/ng2-signalr.svg)](https://badge.fury.io/js/ng2-signalr)
![live demo](https://img.shields.io/badge/demo-live-orange.svg)

# ng2-signalr
An angular typescript library that allows you to connect to Asp.Net SignalR

## Features:
 1. 100% typescript
 2. use rxjs to observe server events 
 3. write unit tests easy using the provided SignalrConnectionMockManager & ActivatedRouteMock

## [ng2-signalr live demo](http://ng2-signalr-webui.azurewebsites.net)
![ng2-signalr](https://cloud.githubusercontent.com/assets/2285199/22845870/f8cdaff4-efe4-11e6-905d-a471a998125a.gif)
source: [ng2 signalr demo](https://github.com/HNeukermans/ng2-signalr.demo.webui.systemjs)

## Installation
```
npm install ng2-signalr --save
```

##Setup
inside app.module.ts
```
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

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

## Create connection 
### 1. inject signalr
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

### 2. inject connection
This approach is preferable. You can easily  rely on the default router navigation events (NavigationStart/End) to keep your user busy while the connection establishment is ongoing. Secondly you can inject the connection directly, facilitating easier unit testing. 
Setup involves 3 steps. 
```
// 1. if you want your component code to be testable, it is best to use a route resolver and make the connection there
import { Resolve } from '@angular/router';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionResolver implements Resolve<SignalRConnection> {

    constructor(private _signalR: SignalR)  {

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
 constructor(
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.connection = this.route.snapshot.data['connection'];
 }


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

### Detailed webpack install
```
npm install jquery signalr expose-loader --save

//inside vendor.ts
import 'expose-loader?jQuery!jquery';
import '../node_modules/signalr/jquery.signalR.js';
```

### Detailed systemjs install
```
TODO
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

  
