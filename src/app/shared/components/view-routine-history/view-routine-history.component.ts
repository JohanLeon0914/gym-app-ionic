import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-view-routine-history',
  templateUrl: './view-routine-history.component.html',
  styleUrls: ['./view-routine-history.component.scss'],
})
export class ViewRoutineHistoryComponent  implements OnInit {

  @Input() routine: Routine
  @Input() history_exercises: Exercise[]

  constructor() { }

  ngOnInit() {}

}
