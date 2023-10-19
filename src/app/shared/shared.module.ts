import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailExerciseComponent } from './components/detail-exercise/detail-exercise.component';
import { HeaderComponent } from './components/header/header.component';
import { RoutineModalComponent } from './components/routine-modal/routine-modal.component';
import { ChronometerComponent } from './components/chronometer/chronometer.component';

@NgModule({
  declarations: [
    DetailExerciseComponent,
    HeaderComponent,
    RoutineModalComponent,
    ChronometerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    DetailExerciseComponent,
    HeaderComponent,
    RoutineModalComponent,
    ChronometerComponent
  ]
})
export class SharedModule { }