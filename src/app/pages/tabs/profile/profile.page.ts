import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilService
  ) {}

  ngOnInit() { }

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilSvc.getElementFromLocalStorage('user'));
  }

  loginWithGoogle() {
    this.firebaseSvc.login().then(async res => {
      this.utilSvc.setElementInLocalStorage('user', res.user);
      this.user = res.user;

      this.utilSvc.dismissLoading();

      this.utilSvc.presentToast({
        message: `Welcome ` + this.user.displayName,
        duration: 1500,
        color: 'primary',
        icon: 'person-outline'
      });
      

    }, error => {
      this.utilSvc.dismissLoading();
      this.utilSvc.presentToast({
        message: error,
        duration: 5000,
        color: 'warning',
        icon: 'alert-circle-outline'
      });
    });
  }

  signOut() {
    this.utilSvc.presentAlert({
      header: 'Sign off!',
      message: 'Are you sure you want to log out?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'yes, log out',
          handler: () => {
            this.firebaseSvc.signOut();
          },
        },
      ],
    });
  }


}
