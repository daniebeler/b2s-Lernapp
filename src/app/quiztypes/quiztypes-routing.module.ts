import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuiztypesPage } from './quiztypes.page';

const routes: Routes = [
  {
    path: '',
    component: QuiztypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuiztypesPageRoutingModule {}
