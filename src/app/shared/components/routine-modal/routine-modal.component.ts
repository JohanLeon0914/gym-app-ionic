import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Exercise } from 'src/models/Exercise.model';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-routine-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.scss'],
})
export class RoutineModalComponent implements OnInit {

  routine: Routine = new Routine()
  @Input() restTime: number;

  constructor(private utilSvc: UtilService) { }

  ngOnInit() {
    this.getRoutine()
  }

  getRoutine() {
    this.routine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
  }

}
