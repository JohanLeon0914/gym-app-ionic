import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent  implements OnInit {

  email:string

  constructor(private utilSvc: UtilService) { }

  ngOnInit() {}

  recoverPassword() {
    // Verifica si el campo de correo electrónico está vacío
    if (!this.email) {
      this.utilSvc.presentToast({
        message: 'Please enter your email address.',
        color: 'danger',
        position: 'top',
        icon: 'alert-circle-outline',
        duration: 2000,
      });
      return;
    }
  
    // Realiza la solicitud de recuperación de contraseña
    this.utilSvc.presentLoading();
    sendPasswordResetEmail(getAuth(), this.email)
      .then(() => {
        this.utilSvc.presentToast({
          message: 'We have sent a password recovery email',
          color: 'success',
          position: 'top',
          icon: 'checkmark-circle-outline',
          duration: 5000,
        });
  
        // Limpia el campo de correo electrónico después del envío
        this.email = "";
  
        // Cierra la pantalla de carga y el modal 
        this.utilSvc.dismissLoading();
        this.utilSvc.dismissModal();
      })
      .catch((error) => {
        // Maneja los errores de Firebase, por ejemplo, correo electrónico no registrado
        this.utilSvc.presentToast({
          message: 'Error: ' + error.message,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
        this.utilSvc.dismissLoading();
      });
  }

}
