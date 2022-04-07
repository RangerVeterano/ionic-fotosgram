import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  //inyectamos nuestro servicio de guards (us)
  constructor(
    private us: UsuarioService
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.us.validarToken();
  }
}
