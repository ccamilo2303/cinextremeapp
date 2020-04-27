import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from './../../environments/environment';
declare var $: any;
declare var jQuery:any;

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  
  public scripts: Array<string> = new Array();
  public peliculas : any;
  public generos : any;
  public ipImagenTMDB :string;
  public pageOfItems : Array<any>;
  public p : any;
  
  public inicio : any;
  public fin : any;
  public anterior:any;
  public siguiente:any;
  public inicioUrl:any;
  public finUrl:any;

  public busquedaGenero:boolean = false;
  public nombreGenero:string = '';
  public newstr:string;

  constructor(private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService, private router: Router) {
    this.ipImagenTMDB = environment.ipImagenTMDB;
   }

  ngOnInit() {

    this.iniciar();
    


    this.httpService.consultarGeneros().subscribe(result => {
      this.generos = result;
      
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });

    
    
  }
  
  consultarGenero(id, name){
    this.httpService.consultarPeliculaGenero(id).subscribe((result: Array<string>) => {
      if (result == null || result == undefined) {
        Swal.fire('Error', 'No se puede mostrar la película', 'error');
        return;
      }
      if (result.length == 0) {
        Swal.fire('Error', 'No se encontraron peliculas para este género', 'error');
        return;
      }
      this.busquedaGenero = true;
      this.nombreGenero = name;
      this.peliculas = result['data'];
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];

    });
  }

  iniciar(){
    this.httpService.consultarCartelera().subscribe(result => {
      this.peliculas = result['data'];
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];
      this.busquedaGenero = false;
      this.nombreGenero = '';
      setTimeout( ()=> {
        init();
      }, 1500);
      

    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });
  }

   urlActual(){
    var urlRedireccion = window.location.href;
    localStorage.setItem('url', urlRedireccion);
  
  }

  pedirPelicula(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      'Por favor escribe el título de la película',
      'Agrega alguna otra descripción u observación'
    ]).then((result) => {
      if (result.value) {
        let obj = {
          'token' : null,
          'nameMovie' : result.value[0],
          'description' : result.value[1]
        }
        this.enviarComentario(JSON.stringify(obj));
        Swal.fire({
          title: 'Gracias!',
          html: `
            Trabajaremos para encontrar tu película, nos contactaremos contigo via email para notificarte. 
          `,
          confirmButtonText: 'Ok!',
          icon: 'success'
        })
      }
    });
  }

  cerrar(){
    sessionStorage.removeItem('email');
    sessionStorage.removeItem(environment.nameToken);
    window.location.href =  environment.ipCinextremeBase;
  }

  enviarComentario(info){
     
    this.newstr = info.split('{').join('').split('}').join('');
    console.log("Info: ", this.newstr);
    this.httpService.solicitudPelicula(this.newstr).subscribe((r: Array<string>) =>{
      
    });
  }
  /**
   * 
   * @param pageOfItems 
   */
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }



  async loadScript() {

    for (let x of this.scripts) {
      let node = document.createElement('script');
      node.src = x;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementById('scriptsTemp').appendChild(node);
      await sleep(5);
    }

    

  }

  paginaAnterior(){
    this.httpService.consultarCarteleraUrl(this.anterior).subscribe(result => {
      top();
      this.cargarPeliculas(result['data']);
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });

  }

  paginaSiguiente(){
    this.httpService.consultarCarteleraUrl(this.siguiente).subscribe(result => {
      top();
      this.cargarPeliculas(result['data']);
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });
  }

  paginaInicio(){
    this.httpService.consultarCarteleraUrl(this.inicioUrl).subscribe(result => {
      top();
      this.cargarPeliculas(result['data']);
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });
  }

  paginaFin(){
    this.httpService.consultarCarteleraUrl(this.finUrl).subscribe(result => {
      top();
      this.cargarPeliculas(result['data']);
      this.inicio = result['current_page'];
      this.fin = result['last_page'];
      this.anterior = result['prev_page_url'];
      this.siguiente = result['next_page_url'];
      this.inicioUrl = result['first_page_url'];
      this.finUrl = result['last_page_url'];
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });
  }

  intervalo ;
  indice:number = 0;
  listaTemporal = null;
  cargarPeliculas(lista){
    if(this.listaTemporal == null){
      this.listaTemporal = lista;
    }
    this.peliculas = new Array();

    this.intervalo = setInterval(() =>{

      if(this.indice < this.listaTemporal.length){
        this.peliculas.push(this.listaTemporal[this.indice]);
        this.indice = this.indice + 1;
      }else{
        this.indice = 0 ;
        this.listaTemporal = null;
        clearInterval(this.intervalo);
      }
    }, 5);
  }

  public modal(link){
    console.log("ENTRÓ");
    $("#video").attr('src',link + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
    $('#myModal').modal();
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function top(){
    //$("html, body").animate({ scrollTop: 400 }, "slow");
}


//preloading for page
/*
var myVar = setInterval(validador, 500);
var carga = false;

function validador() {
    if ($ != undefined || $ != null) {
        clearInterval(myVar);
        if (carga == false) {
            carga = true;
            init();
        }
    }
}*/



function init() { // makes sure the whole site is loaded 
    console.log("carga");
    //clearInterval(myVar);
    var status = $('#status');
    var preloader = $('#preloader');
    var body = $('body');
    status.fadeOut(); // will first fade out the loading animation 
    preloader.delay(0).fadeOut('fast'); // will fade out the white DIV that covers the website. 
    body.delay(0).css({ 'overflow': 'visible' });
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
        }
    }

    'use strict';
    // js for dropdown menu
    var windowWidth = $(window).width();
    if (windowWidth > 1024) {
        var dropdown = $('.dropdown');
        dropdown.hover(
            function() {
                $(this).children('.dropdown-menu').fadeIn(300);
            },
            function() {
                $(this).children('.dropdown-menu').fadeOut(300);
            }
        );
    } else {
        var dropdownClick = $('.navbar a.dropdown-toggle');
        dropdownClick.on('click', function(e) {
            var $el = $(this);
            var $parent = $(this).offsetParent(".dropdown-menu");
            var $open = $('.nav li.open');
            $(this).parent("li").toggleClass('open');

            if (!$parent.parent().hasClass('nav')) {
                $el.next().css({ "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 });
            }
            $open.not($(this).parents("li")).removeClass("open");
            return false;
        });
    }
    //js for nav icon 
    var clickMenubtn = $('#nav-icon1');
    clickMenubtn.on('click', function() {
        $(this).toggleClass('open');
    });
    //js for tabs
    var tabsClick = $('.tabs .tab-links a, .tab-links-2 a, .tab-links-3 a');
    var multiItem = $('.slick-multiItem');
    var multiItem2 = $('.slick-multiItem2');
    tabsClick.on('click', function(e) {
        var currentAttrValue = $(this).attr('href');
        var tabsCurrent = $('.tabs ' + currentAttrValue);
        // Show/Hide Tabs
        tabsCurrent.show().siblings().hide();
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
        //reset position for tabs
        multiItem.slick('setPosition');
        multiItem2.slick('setPosition');
    });
   


    //slider for movie and tv show home 2


    //sticky sidebar
    if (windowWidth > 1200) {
        var stickySidebar = $('.sticky-sb');
        var mainCt = $('.main-content');
        if (stickySidebar.length > 0) {
            var stickyHeight = stickySidebar.height(),
                sidebarTop = stickySidebar.offset().top;
        }
        // on scroll move the sidebar
        $(window).scroll(function() {
            if (stickySidebar.length > 0) {
                var scrollTop = $(window).scrollTop();

                if (sidebarTop < scrollTop) {
                    stickySidebar.css('top', scrollTop - sidebarTop + 80);

                    // stop the sticky sidebar at the footer to avoid overlapping
                    var sidebarBottom = stickySidebar.offset().top + stickyHeight,
                        stickyStop = mainCt.offset().top + mainCt.height();
                    if (stickyStop < sidebarBottom) {
                        var stopPosition = mainCt.height() - stickyHeight + 130;
                        stickySidebar.css('top', stopPosition);
                    }
                } else {
                    stickySidebar.css('top', '0');
                }
            }
        });
        $(window).resize(function() {
            if (stickySidebar.length > 0) {
                stickyHeight = stickySidebar.height();
            }
        });
    }
    // $(window).on('load',function() {

    // });

};

