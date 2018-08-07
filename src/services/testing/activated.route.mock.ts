import { Type } from '@angular/core';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, UrlSegment, Params, Data } from '@angular/router';
import { Observable } from 'rxjs';

export class ActivatedRouteMock implements ActivatedRoute {
    public snapshot: ActivatedRouteSnapshot;
    public url: Observable<UrlSegment[]>;
    public params: Observable<Params>;
    public queryParams: Observable<Params>;
    public fragment: Observable<string>;
    public data: Observable<Data>;
    public outlet: string;
    public component: Type<any> | string;
    public routeConfig: Route;
    public root: ActivatedRoute;
    public parent: ActivatedRoute;
    public firstChild: ActivatedRoute;
    public children: ActivatedRoute[];
    public pathFromRoot: ActivatedRoute[];
    public paramMap: Observable<any>;
    public queryParamMap: Observable<any>;

    constructor() {
        this.snapshot = new ActivatedRouteSnapshot();
    }

    public toString(): string {
        return '';
    }
}
