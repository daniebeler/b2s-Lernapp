import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnotSliderPage } from './knot-slider.page';

const routes: Routes = [
  {
    path: '',
    component: KnotSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnotSliderPageRoutingModule {}
