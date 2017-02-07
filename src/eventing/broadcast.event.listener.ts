import { ReplaySubject } from 'rxjs/ReplaySubject';

export class BroadcastEventListener<T> extends ReplaySubject<T> {
    
    constructor(public event: string) {
        super();
        if (event == null || event === '') 
            throw new Error('Failed to create BroadcastEventListener. Argument \'event\' can not be empty');
    }
}