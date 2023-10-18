import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Exercise } from 'src/models/Exercise.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private routine: Exercise[] = []

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
  ) {
    const routineFromLocalStorage = this.getElementFromLocalStorage('routine');
    if (routineFromLocalStorage) {
      this.routine = routineFromLocalStorage;
    }
   }

  //agregar ejercicio a la rutina
  addExerciseToRoutine(exercise: Exercise){
    const existingItem = this.routine.find(item => item.id === exercise.id);

    if (existingItem) {
      existingItem.sets += 1;
    } else {
      this.routine.push(exercise)
    } 
    this.setElementInLocalStorage('routine', this.routine);
  }

  removeFromRoutine(exerciseId: string): void {
    const itemIndex = this.routine.findIndex(item => item.id === exerciseId);
  
    if (itemIndex !== -1) {
      const item = this.routine[itemIndex];
  
      if (item.sets > 1) {
        item.sets -= 1;
      } else {
        this.routine.splice(itemIndex, 1); // Eliminamos el producto del array
      }
      
      // Guardar el array del carrito actualizado en el localStorage
      this.setElementInLocalStorage('routine', this.routine);
    }
  }

  getRoutine() {
    return this.routine;
  }
  
  //guardando el ejercicio en local storage
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null; 
  }
  
  //funcion para llamar al loading
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  //ocultar el loading una vez termino de cargar
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }
  
  //mensajes de validaciones y de errores
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  //router
  routerLink(url: string) {
    this.router.navigateByUrl(url)
  }
  
  // mensaje de alerta (en caso de cerrar sesion, eliminar o editar datos, etc...)
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
  
    await alert.present();
  }

  //modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();
    //la data que puede que devuelva el modal al cerrarse
    const { data } = await modal.onWillDismiss();
    if(data) {
      return data;
    }
  }
  //si cierras la modal y quieras devolver una data, se pasa atraves de esta funcion
  dismissModal(data?: any){
    this.modalController.dismiss(data);
  }
}
