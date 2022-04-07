import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  //variable local para almacenar todos los post
  posts: Post[] = [];

  //propiedad para el infinite scroll
  habilitado: boolean = true;

  //inyectamos nuestro servicio de posts (post service, ps)
  constructor(
    private ps: PostsService
  ) { }

  ngOnInit(): void {
    this.siguientesPosts();

    //Creamos un escucha para insertar un nuevo post
    this.ps.nuevoPost
      .subscribe(data => {
        //insertamos el post como la primera posiscion
        this.posts.unshift(data)
      })
  }

  //metodo para recargar los posts insertados
  recargar(ev) {

    this.posts = []; //Vaciamos todos los posts
    this.habilitado = true; //marcamos que se pueda volver ha hacer el infite scroll
    this.siguientesPosts(ev, true)

  }

  //metodo para cargar más mensajes en la lista
  siguientesPosts(ev?, pull: boolean = false) {

    //peticion para recoger los posts
    this.ps.getPosts(pull)
      .subscribe(data => {

        // Insertamos todos los post dentro de nuestra variable local
        this.posts.push(...data.post)

        if (ev) {
          //Marcamos como completado el evento (bien el infinte scroll o el refresher)
          ev.target.complete();

          //Deshabilitamos el infinte scroll cuando no se recoge mas informacion
          if (data.post.length === 0) this.habilitado = false
        }
      });
  }

}
