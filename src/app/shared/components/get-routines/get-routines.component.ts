import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-get-routines',
  templateUrl: './get-routines.component.html',
  styleUrls: ['./get-routines.component.scss'],
})
export class GetRoutinesComponent  implements OnInit {

  routines: Routine[]

  constructor(private utilSvc: UtilService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.getRoutines()
  }

  getRoutines() {
    let user: User = this.utilSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}`;
    this.utilSvc.presentLoading()

    let sub = this.firebaseSvc.getSubcollecion(path, 'routines').subscribe({
      next: (res: Routine[]) => {
        this.routines = res;
        sub.unsubscribe();
        this.utilSvc.dismissLoading()
      },
    });
  }

  loadRoutine(routine:Routine) {
    this.utilSvc.setElementInLocalStorage("routine", routine);
    this.utilSvc.presentToast({
      message: "Routine loaded successfuly",
      duration: 1000,
      color: 'primary',
      icon: 'person-outline'
    });
  }

}
