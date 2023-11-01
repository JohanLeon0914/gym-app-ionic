import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Exercise } from 'src/models/Exercise.model';
import { History, Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-view-routine-history',
  templateUrl: './view-routine-history.component.html',
  styleUrls: ['./view-routine-history.component.scss'],
})
export class ViewRoutineHistoryComponent  implements OnInit {

  @Input() routine: Routine
  @Input() history: History

  constructor(private utilSvc: UtilService) { }

  ngOnInit() {}

  getNoteExercise(exercise:Exercise) {
    this.utilSvc.presentAlert({
      header: 'Exercise note: ' + exercise.name,
      message: exercise.note,
      mode: 'ios',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
  }

}
