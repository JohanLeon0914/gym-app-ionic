import { Component } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Exercise } from 'src/models/Exercise.model';

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
    
  }

}
