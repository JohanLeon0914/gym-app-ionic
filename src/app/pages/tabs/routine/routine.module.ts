import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutinePage } from './routine.page';

import { RoutinePageRoutingModule } from './routine-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RoutinePageRoutingModule
  ],
  declarations: [RoutinePage]
})
export class RoutinePageModule {}
