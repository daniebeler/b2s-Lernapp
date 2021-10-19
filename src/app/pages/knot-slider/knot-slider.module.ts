import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { KnotSliderPageRoutingModule } from './knot-slider-routing.module';
import { YoutubePipe } from '../../pipes/youtube.pipe';
import { KnotSliderPage } from './knot-slider.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { KnotsPopoverComponent } from '../../components/knots-popover/knots-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KnotSliderPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [KnotSliderPage, YoutubePipe, KnotsPopoverComponent],
  entryComponents: [KnotsPopoverComponent]
})
export class KnotSliderPageModule {}
