import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BroadcastEvent } from './broadcast.event';

export class BroadcastEventListener<T> extends ReplaySubject<T> {
    
    constructor(public event: string) {
        super();
        if (event == null || event === '') 
            throw new Error('Failed to create BroadcastEventListener. Argument \'method\' can not be empty');
    }
}