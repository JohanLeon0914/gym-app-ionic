import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailExerciseComponent } from './components/detail-exercise/detail-exercise.component';
import { HeaderComponent } from './components/header/header.component';
import { RoutineModalComponent } from './components/routine-modal/routine-modal.component';
import { ChronometerComponent } from './components/chronometer/chronometer.component';
import { SaveRoutineComponent } from './components/save-routine/save-routine.component';
import { GetRoutinesComponent } from './components/get-routines/get-routines.component';
import { ViewRoutineDetailComponent } from './components/view-routine-detail/view-routine-detail.component';
import { ViewRoutineHistoryComponent } from './components/view-routine-history/view-routine-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    DetailExerciseComponent,
    HeaderComponent,
    RoutineModalComponent,
    ChronometerComponent,
    SaveRoutineComponent,
    GetRoutinesComponent,
    ViewRoutineDetailComponent,
    ViewRoutineHistoryComponent,
    ForgotPasswordComponent,
    CustomInputComponent,
    SignUpComponent,
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
    ChronometerComponent,
    SaveRoutineComponent,
    GetRoutinesComponent,
    ViewRoutineDetailComponent,
    ViewRoutineHistoryComponent,
    ForgotPasswordComponent,
    CustomInputComponent,
    SignUpComponent,
  ]
})
export class SharedModule { }