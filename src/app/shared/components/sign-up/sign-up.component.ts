import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sendEmailVerification } from 'firebase/auth';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
  })

  constructor(private utilSvc: UtilService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  onSignUp() {
    if(this.form.controls.confirmPassword.errors?.['noMatch']) {
      this.utilSvc.presentToast({
        message: "Passwords do not match.",
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 2000,
        position: "top"
      });
    }
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.utilSvc.presentLoading()
      this.firebaseSvc.registerWithEmailAndPassword(email, password)
        .then((userCredential) => {
          sendEmailVerification(userCredential.user).then(() => {
            this.utilSvc.dismissLoading()
            this.utilSvc.presentToast({
              message: 'We have sent a verification email to: ' + userCredential.user.email,
              color: 'success',
              icon: 'checkmark-circle-outline',
              duration: 5000,
            });
          })
        })
        .catch((error) => {
          this.manageErrorMessageSignUp(error)
          this.utilSvc.dismissLoading()
        });
    }
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

}
