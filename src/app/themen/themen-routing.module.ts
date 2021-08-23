import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemenPage } from './themen.page';

const routes: Routes = [
  {
    path: '',
    component: ThemenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemenPageRoutingModule {}
