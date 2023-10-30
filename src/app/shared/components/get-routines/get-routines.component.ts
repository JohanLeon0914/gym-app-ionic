import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';
import { Routine } from 'src/models/Routine.model';
import { ViewRoutineDetailComponent } from '../view-routine-detail/view-routine-detail.component';

@Component({
  selector: 'app-get-routines',
  templateUrl: './get-routines.component.html',
  styleUrls: ['./get-routines.component.scss'],
})
export class GetRoutinesComponent  implements OnInit {

  routines: Routine[] = [];

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

  viewRoutineDetail(routine:Routine) {
    this.utilSvc.presentModal({
      component: ViewRoutineDetailComponent,
      componentProps: { routine },
      cssClass: 'add-update-modal',
    });
  }

  deleteRoutine(routine: Routine) {
    this.utilSvc.presentAlert({
      header: 'Delete Routine!',
      message: 'Are you sure you want to delete this routine?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'yes, delete it',
          handler: () => {
            const user: User = this.utilSvc.getElementFromLocalStorage('user');
            let path = `users/${user.uid}`;
            this.utilSvc.presentLoading();
            const loadedRoutine = this.utilSvc.getElementFromLocalStorage("routine") as Routine
            this.firebaseSvc.deleteSubcollectionDocument(path, "routines", routine.id).then(res => {
              if(loadedRoutine.id === routine.id) {
                this.utilSvc.setElementInLocalStorage("routine", new Routine());
              }
              this.utilSvc.presentToast({
                message: 'Routine deleted successfully',
                color: 'success',
                icon: 'checkmark-circle-outline',
                duration: 1500
              });
              this.getRoutines();
              this.utilSvc.dismissLoading();
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
          },
        },
      ],
    });
  }

}
