import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailExerciseComponent } from './components/detail-exercise/detail-exercise.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    DetailExerciseComponent,
    HeaderComponent
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
    HeaderComponent
  ]
})
export class SharedModule { }