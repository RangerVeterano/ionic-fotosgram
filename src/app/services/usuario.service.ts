import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//modulo de almacenamiento
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url; //constante con la url a llamar

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variable local para el token
  token: string = null;

  //variable local para almacenar a informacion del usuario
  //Evitamos que se pueda leer desde fuera
  private usuario: Usuario = {};

  //inyectamos el modulo de peticiones http de angular
  //inyectamos servicio para controlar las navegaciones (navCtrl)
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) {



    this.init();
  }

  //metodo asincrono para iniciar la base de datos
  async init() {
    //iniciamos el almacenamiento interno
    await this.storage.create();
  }

  //metodo par logearse en sel servidor 
 login(email: string, password: string) {

    const data = { email, password };
    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe( async resp => {

          //Si dentro de la respuesta existe un "ok"
          if (resp['ok']) {
            //Si es correcto lo guardamos y lo asignamos
            await this.guardaToken(resp['token']);
            resolve(true);
          } else {
            //sino lo marcamos como nulo
            this.token = null;
            this.storage.clear();// borramos la informacion anterior
            resolve(false)
          }
        });
    });
  }

  //metodo par registrar un usuario en la aplicacion
  registro(usuario: Usuario) {

    return new Promise(resolve => {

      this.http.post(`${URL}/user/create`, usuario)
        .subscribe(async resp => {
          //Si dentro de la respuesta existe un "ok"
          if (resp['ok']) {
            //Si es correcto lo guardamos y lo asignamos
            await this.guardaToken(resp['token']);
            resolve(true);
          } else {
            //sino lo marcamos como nulo
            this.token = null;
            this.storage.clear();// borramos la informacion anterior
            resolve(false)
          }
        });
    });
  }

  //metodo para guardar el token dentro del almacenamiento local
  //La funcion es asincrona para esperar que se guarde en el almacenamiento sin problemas 
  async guardaToken(token: string) {

    this.token = token; //Asignamos el token local
    await this.storage.set('token', token); //Esperamos a que se guarde el token

    //Despues validamos el token de nuevo
    await this.validarToken();
  }

  //metodo asincrono para cargar el token
  async cargarToken() {

    this.token = await this.storage?.get('token') || null;
  }

  //metodo para verificar que el token sea valido
  async validarToken(): Promise<boolean> {

    await this.cargarToken() //mandamos a leer para ver si tenemos token

    //comprobamos que exista el token
    if (!this.token) {
      //Si no existe nos salimos de la aplicación
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            //quiere decir que el token es valido
            this.usuario = resp['usuario'] //Asignamos la informacion recibida al usuario local
            resolve(true)
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false)
          }
        });
    });
  }

  //metodo para recoger la informacion del usuario si existe
  getUsuario() {

    //nos aseguramos que tenemos los datos del usuario
    if (!this.usuario._id) {

      //Sino verificamos que el token que se tiene sea valido
      this.validarToken();
    }

    //desestructuramos el objeto usuario
    return { ...this.usuario }
  }

  //metodo para actualizar la informacion del usuario
  actualizarUsuario(usuario: Usuario) {

    //Especificamos las cabeceras de la peticion
    const headers = new HttpHeaders({
      'x-token': this.token
    })

    return new Promise(resolve => {
      //Mandamos a llamar la peticion para actulizar la informacion
      // url, informacion, headers
      this.http.put(`${URL}/user/update`, usuario, { headers })
        .subscribe(resp => {

          //Para el caso de que todo salga bien
          if (resp['ok']) {
            //Actualizamos el token al nuevo
            this.guardaToken(resp['token']);
            resolve(true) //indicamos que todo ha salido bienj
          } else {
            //Mandamos false para indicar que algo ha salido mal
            resolve(false)
          }
        });
    });
  }

  //Metodo para salirse del programa
  logout() {

    this.token = null; //quitamos el token local
    this.usuario = null; //quitamos los datos del usuario
    this.storage.clear(); //vaciamos la memoria interta del token

    //mandamos al usuario de nuevo al login
    this.navCtrl.navigateRoot('/login', { animated: true })
  }
}
