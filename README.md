[![npm version](https://badge.fury.io/js/ng2-signalr.svg)](https://badge.fury.io/js/ng2-signalr)

# ng2-signalr
An angular typescript library that allows you to connect to Asp.Net SignalR

## Features:
 1. 100% typescript
 2. use rxjs to observe server events 
 3. write unit testable signalr code 

## Installation
```
npm install ng2-signalr --save
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
 // invoke a server side method, with parameters
 this.connection.invoke('ServerMethodName', new Parameters()).then((data: string[]) => {
      this.members = data;
 });
 // invoke a server side method
 this.connection.invoke('GetNgBeSpeakers').then((data: string[]) => {
      this.speakers = data;
 });
``` 
 
## How to listen for connnection status
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



## [ng2-signalr live demo](http://ng2-signalr-webui.azurewebsites.net)


source: [ng2 signalr demo](https://github.com/HNeukermans/ng2-signalr.demo.webui/)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. 

## Contributing

Pull requests are welcome!

## Building

Use `tsc` to compile and build. A `/dist` folder is generated.

```
npm run webpack
```

## Code coverage

Use `npm test` cmd to compile and run all tests. 

## Unit testing

Use `npm test` cmd to compile and run all tests. Test runner is configured with autowatching and 'progress' as test reporter. 

  
