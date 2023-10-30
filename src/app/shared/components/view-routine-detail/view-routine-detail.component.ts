import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-view-routine-detail',
  templateUrl: './view-routine-detail.component.html',
  styleUrls: ['./view-routine-detail.component.scss'],
})
export class ViewRoutineDetailComponent  implements OnInit {

  @Input() routine: Routine

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {}

  convertTimestampToDate(timestamp: any): Date {
    return timestamp.toDate();
  }

}
