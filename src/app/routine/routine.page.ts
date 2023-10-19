import { Component } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Exercise } from 'src/models/Exercise.model';
import { RoutineModalComponent } from '../shared/components/routine-modal/routine-modal.component';

@Component({
  selector: 'app-routine',
  templateUrl: 'routine.page.html',
  styleUrls: ['routine.page.scss']
})
export class RoutinePage {

  routine:Exercise[] = []
  restTimes: number[] = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
  restTime: number = 0

  constructor(private utilSvc: UtilService) {}

  ngOnInit(): void {
    this.getRoutine()
  }

  getRoutine() {
      this.routine = this.utilSvc.getRoutine();
  }

  substractExerciseToRoutine(exercise:Exercise){
    this.utilSvc.removeFromRoutine(exercise.id)
  }

  startRoutine(){
    if(this.restTime!=0) {
      const restTime = this.restTime
      this.utilSvc.presentModal({
        component: RoutineModalComponent,
        componentProps: { restTime },
        cssClass: 'add-update-modal',
      });
    } else {
      this.utilSvc.presentToast({
        message: 'Select a rest time',
        duration: 1500,
      });
    } 
    
  }

  onRestTimeChange(event) {
    this.restTime = event.detail.value;
  }

}
