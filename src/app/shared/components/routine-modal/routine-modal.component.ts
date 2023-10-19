import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Exercise } from 'src/models/Exercise.model';

@Component({
  selector: 'app-routine-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.scss'],
})
export class RoutineModalComponent  implements OnInit {

  routine: Exercise[] = [];

  constructor(private utilSvc: UtilService) { }

  ngOnInit() {
    this.routine = this.utilSvc.getRoutine();
  }

}
