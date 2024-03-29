import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

//importamos la variable de la url
const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, userId: string): string {

    return `${URL}/post/imagen/${userId}/${img}`;
  }

}
