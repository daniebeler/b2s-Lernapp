import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnotSliderPageRoutingModule } from './knot-slider-routing.module';

import { KnotSliderPage } from './knot-slider.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnotSliderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [KnotSliderPage]
})
export class KnotSliderPageModule {}