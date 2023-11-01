import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { UtilService } from 'src/app/services/util.service';
import { history, Routine } from 'src/models/Routine.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'firebase/auth';

enum TimerState {
  restTime,
  exerciseTime,
  preparationTime
}

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.scss'],
})
export class ChronometerComponent implements OnInit {
  @Input() routine: Routine;
  @Input() restTimeNumber: number;
  currentExerciseIndex: number = 0;
  timer: any;
  currentTime: number = 0;
  restTime: boolean = true;
  routineEnded: boolean = false;
  currentExercise: Exercise;
  setsCount: number = 0;
  nextExercise: Exercise | null = null;
  preparationTime: boolean = true;
  routineNote:string = "";

  constructor(private utilSvc: UtilService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.startRoutine();
  }

  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/audio/last-5.mp3';
    audio.load();
    audio.play();
  }

  startRoutine() {
    this.currentExercise = this.routine.exercises[this.currentExerciseIndex];
    if ((this.currentExerciseIndex < this.routine.exercises.length) && this.utilSvc.getIsRoutineModalOpen()) {
      if (this.preparationTime) {
        this.runTimerForPreparationTime()
      } else if (this.restTime) {
        this.runTimerForRestTime()
      } else {
        this.runTimerForExerciseTime()
      }
    }
  }

  runTimerForPreparationTime() {
    this.calculateNextExercise();
    this.currentTime = 10;
    this.timer = setInterval(() => {
      this.currentTime--;
      if (this.currentTime === 0) {
        this.preparationTime = !this.preparationTime
        if (this.currentExerciseIndex < this.routine.exercises.length) {
          this.restTime = !this.restTime;
          this.startNextExercise();
        } else {
          this.routineEnded = true;
        }
      }
      if (this.currentTime === 4 && this.utilSvc.getIsRoutineModalOpen()) {
        this.playAudio();
      }
    }, 1000);
  }

  runTimerForRestTime() {
    this.calculateNextExercise();
    this.currentTime = this.restTimeNumber;
    this.timer = setInterval(() => {
      this.currentTime--;
      if (this.currentTime === 0) {
        if (this.currentExerciseIndex < this.routine.exercises.length) {
          this.restTime = !this.restTime;
          this.startNextExercise();
        } else {
          this.routineEnded = true;
        }
      }
      if (this.currentTime === 4 && this.utilSvc.getIsRoutineModalOpen()) {
        this.playAudio();
      }
    }, 1000);
  }

  runTimerForExerciseTime() {
    this.currentTime = this.currentExercise.run_time;
    this.timer = setInterval(() => {
      this.currentTime--;
      if (this.currentTime === 0) {
        this.setsCount++;
        if (this.currentExercise.sets === 1) {
          this.currentExerciseIndex++;
          this.currentExercise.sets = this.setsCount;
          this.setsCount = 0;
        } else {
          this.currentExercise.sets--;
          this.calculateNextExercise();
        }
        if (this.currentExerciseIndex < this.routine.exercises.length) {
          this.restTime = !this.restTime;
          this.startNextExercise();
        } else {
          this.routineEnded = true;
          if(this.utilSvc.getIsRoutineModalOpen()) {
            this.saveDateCompleted()
          }
        }
      }
      if (this.currentTime === 4 && this.utilSvc.getIsRoutineModalOpen()) {
        this.playAudio();
      }
    }, 1000);
  }

  saveDateCompleted() {
    const user: User = this.utilSvc.getElementFromLocalStorage('user');
    const date_completed = new Date()
    const history:history = {
      "completed_date": date_completed,
      "rest_time": this.restTimeNumber,
      "history_exercises": this.routine.exercises
    }
    this.routine.history.push(history) 
    this.routine.rest_time = this.restTimeNumber
    this.utilSvc.setElementInLocalStorage("routine", this.routine);
    if(user && this.routine.id) {
      let path = `users/${user.uid}/routines/${this.routine.id}`;
      this.utilSvc.setElementInLocalStorage("routine", this.routine);
      this.firebaseSvc.updateDocument(path, this.routine).then(res => {
        this.utilSvc.setElementInLocalStorage("routine", this.routine)
      }, error => {
        this.utilSvc.dismissModal({ success: true });
        this.utilSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000
        });
        this.utilSvc.dismissLoading();
      });
    } 
  }

  calculateNextExercise() {
    if (this.currentExerciseIndex < this.routine.exercises.length) {
      if (this.currentExercise.sets >= 1) {
        this.nextExercise = this.routine.exercises[this.currentExerciseIndex];
      } else {
        this.nextExercise = this.routine.exercises[this.currentExerciseIndex + 1];
      }
    } else {
      this.nextExercise = null;
    }
  }

  startNextExercise() {
    clearInterval(this.timer);
    this.startRoutine();
  }

  makeNoteExercise(exercise: Exercise, index: number) {
    this.utilSvc.presentAlert({
      header: 'Exercise note',
      message: 'Make a note for this exercise: ' + exercise.name,
      mode: 'ios',
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Make your note',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            this.routine.exercises[index].note = data[0]; 
            this.updateRoutine("Note added to your exercise: " + exercise.name)
          },
        },
      ],
    });
  }

  saveNoteRoutine() {
    this.routine.note = this.routineNote;
    this.routineNote = "";
    this.updateRoutine("Note added to your routine");
  }

  updateRoutine(message: string) {
    const user: User = this.utilSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}/routines/${this.routine.id}`;
    this.utilSvc.presentLoading();
    this.firebaseSvc.updateDocument(path, this.routine).then(
      res => {
        this.utilSvc.setElementInLocalStorage("routine", this.routine);
        this.utilSvc.presentToast({
          message: message,
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1000,
        });
        this.utilSvc.dismissLoading(); 
      },
      error => {
        this.utilSvc.dismissModal({ success: true });
        this.utilSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
        this.utilSvc.dismissLoading();
      }
    );
  }

}
