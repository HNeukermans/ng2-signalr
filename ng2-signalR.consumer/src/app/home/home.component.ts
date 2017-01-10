import { Component, NgZone } from '@angular/core';

// tslint:disable-next-line:max-line-length
import { SignalRConnection, ConnectionStatus, BroadcastEventListener } from 'ng2-signalr';
import { ActivatedRoute } from '@angular/router';
import { Parameters } from './parameters';
import { ChatMessage } from './chat.message';
import { BroadcastEvents } from './BroadcastEvents';
import { Subscription } from 'rxjs/Subscription';
import Rx from 'rxjs/Rx';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  localState = { value: '' };
  speakers: string[] = [];
  members: string[] = [];
  errors: any[] = [];
  statuses: ConnectionStatus[] = [];
  message: string = '';
  subscriptions: Subscription[] = [];
  chatMessages: ChatMessage[] = [];
  chatMessagesWithStatus: [ChatMessage, ConnectionStatus][] = [];
  connection: SignalRConnection;

  constructor(
    private route: ActivatedRoute, private zone: NgZone) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.connection = this.route.snapshot.data['connection'];

    if (this.connection == null)
      throw new Error('Failed to initialize HomeComponent. Connection is null');

    this.connection.errors.subscribe((error: any) => {
      this.errors.push(error);
    });

    this.connection.status.subscribe((status: ConnectionStatus) => {
      this.statuses.push(status);
    });
    // this.title.getData().subscribe(data => this.data = data);
  }

  getSpeakers(): void {
    this.connection.invoke('GetNgBeSpeakers').then((data: string[]) => {
      this.speakers = data;
    });
  }

  getCoreTeam(): void {
    this.connection.invoke('GetNgBeCoreTeam', new Parameters()).then((data: string[]) => {
      this.members = data;
    });
  }

  invokeFailingMethod(): void {
    this.connection.invoke('ThrowException').catch((error) => {
      console.log(error);
    });
  }

  simulateSlowConnection(): void {
    this.connection.invoke('SimulateSlowConnection', 15000).then((data: string[]) => {
      this.speakers = data;
    });
  }

  stop(): void {
    this.connection.stop();
  };

  start(): void {
    this.connection.start();
  };

  chat(): void {
    this.connection.invoke('Chat', new ChatMessage('Hannes', this.message))
      .then((data) => {

      });
  };

  listenForMessages(): void {

    let onMessageSent$ = new BroadcastEventListener<ChatMessage>(BroadcastEvents.ON_MESSAGE_SENT);

    this.connection.listen(onMessageSent$);

    if (this.subscriptions.length > 0) {
       this.subscriptions.forEach((s) => s.unsubscribe());
    }

    this.subscriptions = [];

    let subscription1 = onMessageSent$.subscribe((chatMessage: ChatMessage) => {
      this.zone.run(() => {
        this.chatMessages.push(chatMessage);
      });
    });

    this.subscriptions.push(subscription1);
  };

}
