import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';
import { Routine } from 'src/models/Routine.model';
import { ViewRoutineHistoryComponent } from '../view-routine-history/view-routine-history.component';
import { Exercise } from 'src/models/Exercise.model';

@Component({
  selector: 'app-view-routine-detail',
  templateUrl: './view-routine-detail.component.html',
  styleUrls: ['./view-routine-detail.component.scss'],
})
export class ViewRoutineDetailComponent  implements OnInit {

  @Input() routine: Routine

  constructor(private firebaseSvc: FirebaseService, private utilSvc: UtilService) { }

  ngOnInit() {}

  convertToDisplayDate(value: any): Date {
    if (typeof value === 'string') {
      return new Date(value); // Convierte la cadena de fecha a un objeto Date
    } else if (value && value.seconds && value.nanoseconds) {
      return new Date(value.seconds * 1000); // Convierte el Timestamp a un objeto Date
    }
    
    // Si el valor no se puede convertir, regresa null 
    return null;
  }

  viewHistoryOfRoutine(history_exercises:Exercise[]) {
    const routine = this.routine
      this.utilSvc.presentModal({
        component: ViewRoutineHistoryComponent,
        componentProps: { routine, history_exercises },
        cssClass: 'add-update-modal',
      });
  }

}
