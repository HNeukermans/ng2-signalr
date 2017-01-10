import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { HOMEROUTES } from './home/home.route';

export const ROUTES: Routes = [
  ...HOMEROUTES,
  // { path: '',      component: HomeComponent },
  // { path: 'home',  component: HomeComponent },
  { path: 'detail', loadChildren: './+detail/index#DetailModule'},
  { path: '**',    component: NoContentComponent },
];
