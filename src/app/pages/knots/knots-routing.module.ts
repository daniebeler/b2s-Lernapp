import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnotsPage } from './knots.page';

const routes: Routes = [
  {
    path: '',
    component: KnotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnotsPageRoutingModule {}
