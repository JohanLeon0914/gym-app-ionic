import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Exercise } from 'src/models/Exercise.model';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-edit-routine-exercise',
  templateUrl: './edit-routine-exercise.component.html',
  styleUrls: ['./edit-routine-exercise.component.scss'],
})
export class EditRoutineExerciseComponent  implements OnInit {

  @Input() exercise: Exercise 
  form = new FormGroup({
    name: new FormControl('' ,[Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    run_time: new FormControl('', [Validators.required]),
  })

  constructor(private utilSvc: UtilService) { }

  ngOnInit() {
    if(this.exercise) {
      const { name, description, run_time } = this.exercise;
      const run_timeAsString = run_time.toString();
      this.form.setValue({ name, description, run_time: run_timeAsString });
    }
  }

  onEditRoutineExercise() {
    if (this.form.valid) {
      const { name, description, run_time } = this.form.value;
      let routine: Routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine;
      
      // Encuentra el ejercicio que deseas actualizar en el array de ejercicios
      const exerciseToUpdate = routine.exercises.find(ex => ex.id === this.exercise.id);
  
      if (exerciseToUpdate) {
        exerciseToUpdate.name = name;
        exerciseToUpdate.description = description;
        exerciseToUpdate.run_time = parseInt(run_time);
        
        this.utilSvc.setElementInLocalStorage("routine", routine);
        this.utilSvc.dismissModal({ success: true });
      }
    }
  }

}
