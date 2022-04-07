import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

//importacion del swiper core para que todo funcione
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  //confuguracion del slider
  silderOps: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      type: 'bullets',
      clickable: true,

    }
  }

  //recibimos los posts del padre
  @Input() post: Post = {};

  constructor() { }

  ngOnInit() { 
  }

}
