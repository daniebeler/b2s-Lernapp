import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuiztypesPageRoutingModule } from './quiztypes-routing.module';

import { QuiztypesPage } from './quiztypes.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    QuiztypesPageRoutingModule
  ],
  declarations: [QuiztypesPage]
})
export class QuiztypesPageModule {}
