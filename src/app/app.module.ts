import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//modulo de peticiones http de angular
import { HttpClientModule } from '@angular/common/http'

//modulo de almacenamiento
import { IonicStorageModule } from '@ionic/storage-angular';

//modulo de geolocalizacion
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { Camera} from '@awesome-cordova-plugins/camera/ngx';

//modulo para poder subir archivos del movil al servidor
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, //peticiones http
    IonicStorageModule.forRoot({ name: '__fotosGramBD', }) //almacenamiento nativo
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    Geolocation,
    Camera,
    FileTransfer
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
