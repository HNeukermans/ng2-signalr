import { Observable } from 'rxjs';
import { Type } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { ActivatedRoute, Route, ActivatedRouteSnapshot, UrlSegment, Params, Data } from '@angular/router';

export class MockActivatedRoute implements ActivatedRoute{
    snapshot: ActivatedRouteSnapshot;
    url: Observable<UrlSegment[]>;
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    data: Observable<Data>;
    outlet: string;
    component: Type<any>|string;
    routeConfig: Route;
    root: ActivatedRoute;
    parent: ActivatedRoute;
    firstChild: ActivatedRoute;
    children: ActivatedRoute[];
    pathFromRoot: ActivatedRoute[];
    toString(): string{
        return '';
    };

    constructor() {
      this.snapshot = new ActivatedRouteSnapshot();
    }
}
