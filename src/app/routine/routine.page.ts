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
    this.utilSvc.presentModal({
      component: RoutineModalComponent,
      cssClass: 'add-update-modal',
    });
  }

}
