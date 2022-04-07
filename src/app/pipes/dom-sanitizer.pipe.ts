import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  //inyectamos el servicio de dom sanitizer para poder insertar codigo seguro en nuestra aplicacion
  constructor(
    private _domSanitizer: DomSanitizer
  ) {

  }

  transform(img: string): SafeStyle {
    const domImg = `background-image: url(${img});`

    return this._domSanitizer.bypassSecurityTrustStyle(domImg)
  }

}
