import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { Platform } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.scss'],
})
export class ChronometerComponent implements OnInit {
  @Input() routine: Exercise[];
  @Input() restTimeNumber: number;
  currentExerciseIndex: number = 0;
  timer: any;
  currentTime: number = 0;
  restTime: boolean = true;
  rutineEnded: boolean = false;
  currentExercise: Exercise;
  setsCount: number = 0;
  nextExercise: Exercise | null = null;

  constructor(private platform: Platform, private utilSvc: UtilService) {}

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
    this.currentExercise = this.routine[this.currentExerciseIndex];
    if (this.currentExerciseIndex < this.routine.length) {
      if (this.restTime) {
        this.calculateNextExercise();
        this.currentTime = this.restTimeNumber;
        this.timer = setInterval(() => {
          this.currentTime--;
          if (this.currentTime === 0) {
            if (this.currentExerciseIndex < this.routine.length) {
              this.restTime = !this.restTime;
              this.startNextExercise();
            } else {
              this.rutineEnded = true;
            }
          }
          if(this.currentTime === 4 && this.utilSvc.getIsRoutineModalOpen()){
            this.playAudio();
          }
        }, 1000);
      } else {
        this.currentTime = this.currentExercise.run_time;
        this.timer = setInterval(() => {
          this.currentTime--;
          if (this.currentTime === 0) {
            this.setsCount++;
            if(this.currentExercise.sets === 1) {
              this.currentExerciseIndex++;
              this.currentExercise.sets = this.setsCount;
              this.setsCount = 0;
            } else {
              this.currentExercise.sets--;
              this.calculateNextExercise();
            }
            if (this.currentExerciseIndex < this.routine.length) {
              this.restTime = !this.restTime;
              this.startNextExercise();
            } else {
              this.rutineEnded = true;
            }
          }
          if(this.currentTime === 4 && this.utilSvc.getIsRoutineModalOpen()){
            this.playAudio();
          }
        }, 1000);
      }
    }
  }

  calculateNextExercise() {
    if (this.currentExerciseIndex < this.routine.length) {
      if(this.currentExercise.sets >= 1) {
        this.nextExercise = this.routine[this.currentExerciseIndex];
      } else {
        this.nextExercise = this.routine[this.currentExerciseIndex + 1];
      } 
    } else {
      this.nextExercise = null;
    }
  }

  startNextExercise() {
    clearInterval(this.timer);
    this.startRoutine();
  }
}
