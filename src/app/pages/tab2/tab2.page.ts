import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Capacitor } from '@capacitor/core';

//importamos modulo de geolocalizacion
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

//importamos modulo de camara nativa
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //variable local de todas las imágenes subidas para el post
  tempImages: string[] = [];

  //bandera para indicar si se está cargando la geolocalizacion
  cargandoGeo: boolean = false;

  //variable local para el post
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  //inyectamos el servicio para gestionar los post (ps)
  //inyectamos el controlador de rutas de angular
  //inyectamos el servicio para la geolocalizacion de la aplicacion
  constructor(
    private ps: PostsService,
    private route: Router,
    private geo: Geolocation,
    private camera: Camera
  ) { }

  //metodo para crear post
  async crearPost() {

    const creado = await this.ps.crearPost(this.post); //hacemos la peticion

    //vaciamos el post
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    }

    //vaciamos las imágenes temporales
    this.tempImages = [];

    //navegamos a la ventana de los posts
    this.route.navigateByUrl('/main/tabs/tab1');

  }

  //metodo para conseguir la geolocalizacion del usuario
  getGeo() {

    //si está en false, se indican las coordenadas como nulas y nos salimos de la funcion
    if (!this.post.posicion) {
      this.post.coords = null;
      return
    }

    //Marcamos que estamos buscando la localizacion
    this.cargandoGeo = true;

    this.geo.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`

      //quitamos el indicativo de que estamos buscando la posicion
      this.cargandoGeo = false
      this.post.coords = coords;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //Metodo para abrir la camara y tomar una fotografia
  camara() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);

  }

  //metodo para poder seleccionar imágenes de la galería
  libreria() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen(options);

  }

  //metodo para procesar la imagen recibida
  procesarImagen(options: CameraOptions) {

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = Capacitor.convertFileSrc(imageData);

      this.ps.subirImagen(imageData); //subimos la foto al servidor
      this.tempImages.push(img); //añadimos la foto a la galeria local
    }, (err) => {
      // Handle error
    });
  }

}
