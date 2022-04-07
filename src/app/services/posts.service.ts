import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaPost, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //indicamos en qué página están los post que vamos a mostrar
  public paginaPost = 0;

  //creamos una variable para insertar un post sin refrescar toda la informacion
  nuevoPost = new EventEmitter<Post>();

  //inyectamos modulo de peticiones http 
  //importamos servicio de gestion de usuario (us)
  //inyectamos el servicio para poder subir archivos FileTransfer (ft)
  constructor(
    private http: HttpClient,
    private us: UsuarioService,
    private ft: FileTransfer
  ) { }

  //metodo para poder recoger todos los posts 
  getPosts(pull: boolean = false): Observable<RespuestaPost> {

    //Si el pull es true quiere decir que queremos recargar los datos de nuevo
    if (pull) {

      //marcamos que la página a buscar es la 0 de nuevo
      this.paginaPost = 0;
    }

    //Cada vez que se llame el metodo añadimos una página
    this.paginaPost++;

    return this.http.get<RespuestaPost>(`${URL}/post?pagina=${this.paginaPost}`)
  }

  crearPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.us.token //Guardamos el token en el header
    })

    return new Promise(resolve => {

      //realizamos la peticion a nuestro servidor
      this.http.post(`${URL}/post`, post, { headers })
        .subscribe(resp => {

          this.nuevoPost.emit(resp['post']);
          resolve(true)

        });
    });
  }

  //metodo para subir cualquier archivo pero en este caso solo imágenes
  subirImagen(img: string) {

    const options: FileUploadOptions = {
      fileKey: 'image', //Especificamos el mismo nombre del archivo que se tiene que subir
      headers: { //Indicamos que headers tiene que tener la aplicacion
        'x-token': this.us.token
      }
    }

    //Creamos la transferencia
    const fileTransfer: FileTransferObject = this.ft.create();

    //string de la imagen, url a la que llamar, opciones de la subida
    //Esto devuelve una promesa
    fileTransfer.upload(img, `${URL}/post/upload`, options)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log('Error de carga', err);
      })

  }
}
