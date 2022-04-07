import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitizerPipe, //Exportamos el pipe para poder emplearlo fuera de este modulo
    ImagenPipe
  ]
})
export class PipesModule { }
