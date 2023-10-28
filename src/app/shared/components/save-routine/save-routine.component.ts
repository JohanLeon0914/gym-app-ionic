import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';
import { Routine } from 'src/models/Routine.model';

@Component({
  selector: 'app-save-routine',
  templateUrl: './save-routine.component.html',
  styleUrls: ['./save-routine.component.scss'],
})
export class SaveRoutineComponent implements OnInit {

  user = {} as User;
  routine: Routine = new Routine()

  constructor(private utilSvc: UtilService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.getRoutine()
  }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilSvc.getElementFromLocalStorage('user'));
  }

  getRoutine() {
    this.routine = this.utilSvc.getRoutine();
  }

  onRoutineNameChange(event) {
    const routineName = event.detail.value;
    this.routine.name = routineName;
  }

  saveRoutine() {
    let path = `users/${this.user.uid}`;
    if (this.routine.name.length < 3 || this.routine.name.length > 50) {
      this.utilSvc.presentToast({
        message: "The routine name must be more than 5 characters and less than 50.",
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      });
    } else {
      this.utilSvc.presentLoading();
      this.firebaseSvc.addSubcollecion(path, 'routines', this.routine).then(res => {
        this.utilSvc.setElementInLocalStorage("routine", this.routine)
        this.utilSvc.dismissModal({ success: true });
        this.utilSvc.presentToast({
          message: 'Routine saved successfully',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500
        });
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
    }

  }

}
