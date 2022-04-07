import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';

//importacion del modulo de swiper
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [
    PostComponent, //declaramos los dos componentes
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    IonicModule, // importamos el modulo para los componentes de ionic
    SwiperModule,
    PipesModule //Importamos nuestro modulo de pipes personalizados
  ],
  exports: [
    PostsComponent, //Exportamos nuestro componente de posts para poder emplearlo fuera de este modulo
    AvatarSelectorComponent
  ]
})
export class ComponentsModule { }
