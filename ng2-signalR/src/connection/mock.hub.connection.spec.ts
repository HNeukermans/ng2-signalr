// import { HubBackendMock } from './mock.hub.backend';
// import { SignalRConfiguration } from '../../signalr.configuration';
// import { HubCallBack } from '../hub.callback';
// import { SignalRConnectionMock } from '../connection/signalr.connection.mock';
// import { SignalRConnectionBase } from '../connection/hub.connection';
// import { ValueService } from '../../../value.service';

// describe('SignalRConnectionMock', () => {


//     let config = new SignalRConfiguration();
//     let hcb = new HubCallBack('OnMessageReceived');

//     config.hubCallBacks.push(hcb);

//     it('constructor should set the configuration', () => {
//         //act
//         let connection = new SignalRConnectionMock(config);
//         //assert
//         expect(connection.configuration).toEqual(config);
//     });

//     it('mocking a hubcallback should fire the configured hubcallback', () => {
//         let receivedMessage = null;
//         hcb.subscribe(c => receivedMessage = c);
//         //act
//         let connection = new SignalRConnectionMock(config);
//         //assert
//         connection.mockHubCallBack('OnMessageReceived', {});

//         expect(receivedMessage).toEqual({});
//     });
// });
