import { Component, OnInit } from '@angular/core';
import { Auth, RecaptchaVerifier, SAMLAuthProvider, User, sendEmailVerification } from 'firebase/auth';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilService } from '../../../services/util.service';
import { GetRoutinesComponent } from 'src/app/shared/components/get-routines/get-routines.component';
import { Routine } from 'src/models/Routine.model';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IfStmt } from '@angular/compiler';
import { ForgotPasswordComponent } from 'src/app/shared/components/forgot-password/forgot-password.component';
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  // format phone numbers as E. 164 
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }
}

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
  ) { }

  ngOnInit() { }

  private afAuth: AngularFireAuth
  phoneNumber: string;
  auth: Auth

  ionViewWillEnter() {
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilSvc.getElementFromLocalStorage('user'));
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      this.firebaseSvc.loginWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            this.user = userCredential.user;
            this.utilSvc.setElementInLocalStorage("user", this.user)
            this.utilSvc.presentToast({
              message: 'Welcome ' + this.user.email,
              color: 'success',
              position: 'top',
              icon: 'checkmark-circle-outline',
              duration: 2000,
            });
          } else {
            this.utilSvc.presentToast({
              message: userCredential.user.email + " is not verified.",        
              color: 'danger',
              position: 'top',
              icon: 'checkmark-circle-outline',
              duration: 2000,
            });
          }

        })
        .catch((error) => {
          this.manageErrorMessageLogin(error)
        });
    }
  }

  onSignUp(registerForm: NgForm) {
    if (registerForm.valid) {
      const { email, password } = registerForm.value;
      this.utilSvc.presentLoading()
      this.firebaseSvc.registerWithEmailAndPassword(email, password)
        .then((userCredential) => {
          sendEmailVerification(userCredential.user).then(() => {
            this.utilSvc.presentToast({
              message: 'We have sent a verification email to: ' + userCredential.user.email,
              color: 'success',
              position: 'top',
              icon: 'checkmark-circle-outline',
              duration: 5000,
            });
          })
          this.utilSvc.dismissLoading()
        })
        .catch((error) => {
          this.manageErrorMessageSignUp(error)
          this.utilSvc.dismissLoading()
        });
    }
  }

  manageErrorMessageLogin(error) {
    let errorMessage: string;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Incorrect email or password.';
        break;
      // Agrega más casos según sea necesario para manejar otros posibles errores.
      default:
        errorMessage = 'An error occurred during login.';
    }
    this.utilSvc.presentToast({
      message: errorMessage,
      color: 'warning',
      icon: 'alert-circle-outline',
      duration: 5000,
      position: "top"
    });
  }

  manageErrorMessageSignUp(error) {
    let errorMessage: string;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'The email is already in use.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      // Agrega más casos según sea necesario para manejar otros posibles errores.
      default:
        errorMessage = 'An error occurred during registration.';
    }
    this.utilSvc.presentToast({
      message: errorMessage,
      color: 'warning',
      icon: 'alert-circle-outline',
      duration: 5000,
      position: "top"
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
            const routine: Routine = new Routine()
            this.utilSvc.setElementInLocalStorage("routine", routine)
          },
        },
      ],
    });
  }

  async openModalGetRoutines() {
    let res = await this.utilSvc.presentModal({
      component: GetRoutinesComponent,
      cssClass: 'add-update-modal',
    });
    if (res && res.success) {
    }
  }

  async forgotPassword(){
    let res = await this.utilSvc.presentModal({
      component: ForgotPasswordComponent,
      cssClass: 'add-update-modal',
    });
    if (res && res.success) {
    }
  }


}
