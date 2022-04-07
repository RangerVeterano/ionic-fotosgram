import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  //inyectamos servicio controlador de alertas
  //inyectamos servicio controlador de los mensajes toast
  constructor(
    private alertaCtrl: AlertController,
    private toastCrtl: ToastController
  ) { }

  //metodo general para mostrar mensajes informativos en la aplicacion
  async alertaInformativa(msg: string) {
    const alert = await this.alertaCtrl.create({
      message: msg,
      buttons: ['OK'],
      backdropDismiss: false
    });

    await alert.present();
  }

  //metodo para mandar un mensaje informativo de tipo toast
  async presentToast(message: string) {
    const toast = await this.toastCrtl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
