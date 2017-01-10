import { HomeComponent } from './home.component';
import { HomeRouteResolver } from './home.route.resolver';

export const HOMEROUTES = [
  { path: '',
    component: HomeComponent,
    resolve : {
        connection: HomeRouteResolver
      }
  },
  { path: 'home', component: HomeComponent, resolver : HomeRouteResolver }
];
