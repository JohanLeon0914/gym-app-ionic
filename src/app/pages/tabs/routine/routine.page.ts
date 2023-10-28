import { Component } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { RoutineModalComponent } from '../../../shared/components/routine-modal/routine-modal.component';
import { UtilService } from '../../../services/util.service';
import { Routine } from 'src/models/Routine.model';
import { SaveRoutineComponent } from 'src/app/shared/components/save-routine/save-routine.component';
import { GetRoutinesComponent } from 'src/app/shared/components/get-routines/get-routines.component';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-routine',
  templateUrl: 'routine.page.html',
  styleUrls: ['routine.page.scss']
})
export class RoutinePage {

  user = {} as User;
  routine: Routine = new Routine();
  restTimes: number[] = Array.from({ length: 60 }, (_, i) => (i + 1) * 5);
  restTime: number = 0

  constructor(private utilSvc: UtilService) { }

  ngOnInit(): void {
    this.getRoutine()
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilSvc.getElementFromLocalStorage('user'));
  }

  ionViewDidEnter() {
    this.getRoutine()
  }

  getRoutine() {
    this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
  }

  substractExerciseToRoutine(exercise: Exercise) {
    this.utilSvc.removeFromRoutine(exercise.id, this.routine)
    this.getRoutine()
  }

  addExerciseToRoutine(exercise: Exercise) {
    this.utilSvc.addExerciseToRoutine(exercise, this.routine);
    this.getRoutine()
  }

  async startRoutine() {
    if (this.restTime != 0) {
      const restTime = this.restTime
      let res = await this.utilSvc.presentModal({
        component: RoutineModalComponent,
        componentProps: { restTime },
        cssClass: 'add-update-modal',
      });
      if (res && res.success) {
        this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
      }
    } else {
      this.utilSvc.presentToast({
        message: 'Select a rest time',
        duration: 1500,
      });
    }

  }

  async saveRoutine() {
    let res = await this.utilSvc.presentModal({
      component: SaveRoutineComponent,
      cssClass: 'add-update-modal',
    });
    if (res && res.success) {
      this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
    }
  }

  onRestTimeChange(event) {
    this.restTime = event.detail.value;
  }

  async openModalGetRoutines() {
    let res = await this.utilSvc.presentModal({
      component: GetRoutinesComponent,
      cssClass: 'add-update-modal',
    });
    if (res && res.success) {
      this.getRoutine()
    }
  }

}
