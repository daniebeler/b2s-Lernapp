import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnotsPageRoutingModule } from './knots-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { KnotsPage } from './knots.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnotsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [KnotsPage]
})
export class KnotsPageModule {}
