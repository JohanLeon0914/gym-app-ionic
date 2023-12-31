import { Component } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { RoutineModalComponent } from '../../../shared/components/routine-modal/routine-modal.component';
import { UtilService } from '../../../services/util.service';
import { Routine } from 'src/models/Routine.model';
import { SaveRoutineComponent } from 'src/app/shared/components/save-routine/save-routine.component';
import { GetRoutinesComponent } from 'src/app/shared/components/get-routines/get-routines.component';
import { User } from 'firebase/auth';
import { EditRoutineExerciseComponent } from 'src/app/shared/components/edit-routine-exercise/edit-routine-exercise.component';

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
    this.getRoutine();
    this.getUser();
  }

  getRoutine() {
    if (this.utilSvc.getElementFromLocalStorage("routine")) {
      this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
    } else {
      this.routine = new Routine();
    }

  }

  substractExerciseToRoutine(exercise: Exercise, index: number) {
    if(exercise.sets > 1) {
      this.utilSvc.removeFromRoutine(exercise.id, this.routine)
      this.getRoutine()
    } else  {
      this.deleteRoutineExercise(exercise, index)
    }
    
  }

  addExerciseToRoutine(exercise: Exercise) {
    this.utilSvc.addExerciseToRoutine(exercise, this.routine);
    this.getRoutine()
  }

  async startRoutine() {
    if (this.restTime != 0) {
      const restTime = this.restTime
      this.utilSvc.setIsRoutineModalOpen(true);
      let res = await this.utilSvc.presentModal({
        component: RoutineModalComponent,
        componentProps: { restTime },
        cssClass: 'add-update-modal',
      });
      if (res && res.success) {
        this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine;
        this.utilSvc.setIsRoutineModalOpen(false);
      }
    } else {
      this.utilSvc.presentToast({
        message: 'Select a rest time',
        duration: 1500,
      });
    }

  }

  async saveRoutine() {
    if(this.user) {
      let routine = this.routine
      let res = await this.utilSvc.presentModal({
        component: SaveRoutineComponent,
        componentProps: { routine },
        cssClass: 'add-update-modal',
      });
      if (res && res.success) {
        this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
      }
    } else {
      this.utilSvc.presentAlert({
        header: 'Save your routines!',
        message: 'You need to sign in to access and save routines.',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Sign in',
            handler: () => {
              this.utilSvc.routerLink("tabs/profile")
            },
          },
        ],
      });
    }
    
  }

  onRestTimeChange(event) {
    this.restTime = event.detail.value;
  }

  cleanRoutine() {
    this.utilSvc.presentAlert({
      header: 'Clean routine',
      message: 'Are you sure you want to clean the routine?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'yes, clean it',
          handler: () => {
            const cleanRoutine: Routine = new Routine()
            this.utilSvc.setElementInLocalStorage("routine", cleanRoutine)
            this.getRoutine();
          },
        },
      ],
    });
  }

  async openModalGetRoutines() {
    if(this.user) {
      let res = await this.utilSvc.presentModal({
        component: GetRoutinesComponent,
        cssClass: 'add-update-modal',
      });
      if (res && res.success) {
        this.getRoutine()
      }
    } else {
      this.utilSvc.presentAlert({
        header: 'Acces your routines!',
        message: 'You need to sign in to access and save routines.',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Sign in',
            handler: () => {
              this.utilSvc.routerLink("tabs/profile")
            },
          },
        ],
      });
    } 
    
  }

  async openModalEditRoutineExercise(exercise:Exercise) {
    let res = await this.utilSvc.presentModal({
      component: EditRoutineExerciseComponent,
      componentProps: { exercise },
      cssClass: 'add-update-modal',
    });
    if (res && res.success) {
      this.getRoutine()
    }
  }

  deleteRoutineExercise(exercise:Exercise, index:number) {
    this.utilSvc.presentAlert({
      header: 'Delete exercise!',
      message: 'Are you sure you want to delete ' + exercise.name + 'of your routine.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'yes, delete it',
          handler: () => {
            this.routine.exercises.splice(index, 1); 
            this.utilSvc.setElementInLocalStorage('routine', this.routine);
            this.getRoutine()
          },
        },
      ],
    });
  }

}
