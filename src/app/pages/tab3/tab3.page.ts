import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServicesService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  //Variable local del usuario
  usuario: Usuario = {};

  //inyectamos nuestro servicio de usuario
  //inyectamos servicio de mensajes al usuario
  //inyectamos servicio de posts para poder borrar las páginas
  constructor(
    private us: UsuarioService,
    private uiservice: UiServicesService,
    private ps: PostsService
  ) { }

  ngOnInit(): void {

    this.usuario = this.us.getUsuario();

  }

  async actualizar(fActualizar: NgForm) {

    //si no tenemos la informacion completa no salimos de la aplicacion
    if (fActualizar.invalid) return;

    //Si nop hay fallos mandamos el nuevo usuario
    const actualizado = await this.us.actualizarUsuario(this.usuario);

    if (actualizado) {
      //Toast con el mensaje de actualizado
      this.uiservice.presentToast('Se ha actualizado el usuario');
    } else {
      //Toast marcando que ha pasado un error
      this.uiservice.presentToast('No se ha podido actualizar')
    }

  }

  logout() {
    this.ps.paginaPost = 0 //reiniciamos el contador de paginas
    this.us.logout();
  }

}
