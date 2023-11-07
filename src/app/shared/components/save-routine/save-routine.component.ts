import { Component, Input, OnInit } from '@angular/core';
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
  @Input() routine: Routine 

  constructor(private utilSvc: UtilService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilSvc.getElementFromLocalStorage('user'));
  }

  onRoutineNameChange(event) {
    const routineName = event.detail.value;
    this.routine.name = routineName;
  }

  saveRoutine() {
    if (this.routine.name.length < 3 || this.routine.name.length > 50) {
      this.utilSvc.presentToast({
        message: "The routine name must be more than 5 characters and less than 50.",
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      });
    } else {
      if (this.routine.id) {
        this.utilSvc.presentAlert({
          header: 'Update or create Routine!',
          message: 'This routine already exists, do you want to overwrite it?',
          mode: 'ios',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'yes, overwrite it',
              handler: () => {
                this.updateRoutine();
              },
            },
            {
              text: 'Save as new routine',
              handler: () => {
                this.createNewRoutine();
              },
            }
          ],
        });
        
      } else {
        this.createNewRoutine()
      }

    }

  }

  updateRoutine() {
    let path = `users/${this.user.uid}/routines/${this.routine.id}`;
    this.utilSvc.presentLoading();

    this.firebaseSvc.updateDocument(path, this.routine).then(res => {
      this.utilSvc.setElementInLocalStorage("routine", this.routine)
      this.utilSvc.dismissModal({ success: true });
      this.utilSvc.presentToast({
        message: 'Routine updated successfully',
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

  createNewRoutine() {
    let path = `users/${this.user.uid}`;
    this.utilSvc.presentLoading();
        this.firebaseSvc.addSubcollecion(path, 'routines', this.routine).then(res => {
          this.routine.id = res.id;
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
