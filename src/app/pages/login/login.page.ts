import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import SwiperCore, { Swiper, Virtual, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from 'src/app/interfaces/interfaces';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('sliderPrincipal', { static: false }) slides?: SwiperComponent;

  //variable para logearse con el usuario
  loginUser = {
    email: '',
    password: ''
  }

  //Variable para agilizar el registrar usuarios
  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    avatar: 'av-1.png'
  }

  //inyectamos servicio de usuarios (us)
  //inyectamos controlador de la navegacion
  //inyectamos servicio general para mostrar mensajes al usuario
  constructor(
    private us: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServicesService
  ) { }

  //Cogemos la referencia del elemento despues de que la vista haya cargado
  ngAfterViewInit(): void {
    this.slides.swiperRef.disable(); //bloqueamos el slide
  }

  ngOnInit() {

  }

  //mostramos el slide del registro
  mostarRegistro() {
    this.slides.swiperRef.enable(); // Activamos el slider para poder movernos
    this.slides.swiperRef.slideTo(0); //nos movemos
    this.slides.swiperRef.disable();// Desactivamos de nuevo el slider

  }

  //mostramos el registro
  mostrarLogin() {
    this.slides.swiperRef.enable();
    this.slides.swiperRef.slideTo(1);
    this.slides.swiperRef.disable();
  }


  //metodo asincrono para logearse en nuestra aplicacion
  async login(fLogin: NgForm) {

    if (fLogin.invalid) return
    //El await trabaja con el resultado de la promesa, para este caso (true o false)
    const valido = await this.us.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      //navegar al tabs, indicamos la ruta, luego podemos añadir una animacion
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      //Mostrar alerta de usuario y contraseñas no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no validos.');
    }
  }

  //metodo para gestionar el registro
  async registro(fRegistro: NgForm) {

    //comprobamos que todos los campos esten bien
    if (fRegistro.invalid) return
    
    this.us.registro(this.registerUser)
    .catch(err => {
      console.log(err);
    })

    const valido = await this.us.registro(this.registerUser);

    if (valido) {
      //navegar al tabs, indicamos la ruta, luego podemos añadir una animacion
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true })
    } else {
      //Mostrar alerta de usuario y contraseñas no correctos
      this.uiService.alertaInformativa('El correo electronico ya existe');
    }
  }
}
