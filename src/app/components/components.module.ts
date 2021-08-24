import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { CustomFooterComponent } from './custom-footer/custom-footer.component';

@NgModule ({
  imports: [IonicModule],
  declarations: [CustomHeaderComponent, CustomFooterComponent],
  exports: [CustomHeaderComponent, CustomFooterComponent]
})

export class ComponentsModule{}
