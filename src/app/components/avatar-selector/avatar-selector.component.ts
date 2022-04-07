import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';

import SwiperCore, { Swiper, Virtual, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit, AfterViewInit {

  @Output() avatarSel = new EventEmitter<string>();
  @ViewChild('sliderAvatar', { static: false }) slider?: SwiperComponent;
  @Input('avatar') avatar: string; //Cargamos el avatar del padre

  //Avatares para seleccionar en el login
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  //opciones para el slider de los avatares
  avatarOps: SwiperOptions = {
    slidesPerView: 3.5,
    centeredSlides: true,
    virtual: true
  }

  constructor() { }

  ngOnInit() {

    this.avatars.forEach((avatar, index) => {
      avatar.seleccionado = false
      if (avatar.img === this.avatar) {
        avatar.seleccionado = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.avatars.forEach((avatar, index) => {
      if (avatar.seleccionado) {
        this.slider?.swiperRef.slideTo(index);
      }
    });
  }



  //Metodo para marcar el avatar seleccionado
  seleccionarAvatar(avatar, index) {

    //movemos el slider al elemento seleccionado
    this.slider.swiperRef.slideTo(index)

    //Desmarcamos a todos los avatares de estar eleccionados
    this.avatars.forEach(av => av.seleccionado = false);

    //Como en javascript todo es pasado por referecia podemos marcar el avatar que queremos seleccionar
    avatar.seleccionado = true;

    //LLamamos emitimos el nombre del avatar a insertar
    this.avatarSel.emit(avatar.img)
  }

}
