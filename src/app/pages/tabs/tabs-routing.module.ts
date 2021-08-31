import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home/quiztypes/:schein',
        loadChildren: () => import('../quiztypes/quiztypes.module').then( m => m.QuiztypesPageModule)
      },
      {
        path: 'home/themen/:schein',
        loadChildren: () => import('../themen/themen.module').then( m => m.ThemenPageModule)
      },
      {
        path: 'knots',
        loadChildren: () => import('../knots/knots.module').then(m => m.KnotsPageModule)
      },
      {
        path: 'knots/knot-slider/:knot',
        loadChildren: () => import('../knot-slider/knot-slider.module').then(m => m.KnotSliderPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then(m => m.VideosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
