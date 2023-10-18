import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Exercise } from 'src/models/Exercise.model';
import { UtilService } from '../services/util.service';
import { DetailExerciseComponent } from '../shared/components/detail-exercise/detail-exercise.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  exercises: Exercise[] = [];

  constructor(private api: ApiServiceService, private utilSvc: UtilService) {}

  ngOnInit(): void {
    this.api.getExercises().subscribe((exercises) => {
      this.exercises = exercises;
      console.log(this.exercises);
    });
  }

  addExerciseToRoutine(exercise: Exercise) {
    this.utilSvc.addExerciseToRoutine(exercise)
      this.utilSvc.presentToast({
        message: 'Exercise added to your routine',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 800
      });
  }

  openModalExerciseDetail(exercise: Exercise) {
    this.utilSvc.presentModal({
      component: DetailExerciseComponent,
      componentProps: { exercise },
      cssClass: 'add-update-modal',
    });
  }

}
