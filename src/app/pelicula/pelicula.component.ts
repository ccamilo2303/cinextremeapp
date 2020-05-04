import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import Swal from 'sweetalert2';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import { environment } from './../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  
  public url: string;
  public scripts: Array<string> = new Array();
  public imagenes: Array<string> = new Array();
  public ipImagenTMDB = environment.ipImagenTMDB;
  public nombre:string;
  public descripcion:string;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService) {
    this.scripts.push("assets/jsPelicula/scripts/jquery.js");
    this.scripts.push("assets/jsPelicula/scripts/jquery-migrate-1.4.1.min.js");
    this.scripts.push("assets/jsPelicula/scripts/spin.js");
    this.scripts.push("assets/jsPelicula/scripts/custom.js");
    
   }

  ngOnInit() {
    this.iniciar();
    let id = this.route.params.subscribe(p => {
      if (p == undefined || p['idTMDB'] == undefined ||  p['nombre'] == undefined ) {
        Swal.fire('Error', 'No se puede mostrar la película', 'error');
        return;
      }
      
      this.nombre =  p['nombre'] ;
      this.httpService.consultarPelicula(p['idTMDB']).subscribe((r: Array<string>) => {
        if (r == null || r == undefined) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        if (r.length == 0) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }

        this.url = r[0]['url_movie'];
        this.descripcion = r[0]['description_Movie'];
        document.getElementById('contenedorVideo').innerHTML = '<div class="videoContainer self-video" id="video130" data-vidid="' + r[0]['url_movie'] + '"> <div class="closeVideo"><div><i class="fa fa-times"></i></div></div> </div>'
        for(let x = 1 ; x <= 1 ; x ++){
          this.imagenes.push(environment.direccion + p['idTMDB']+"/"+x+".jpg");
        }

        setTimeout( ()=> {
          this.loadScript();
        }, 500);
        

        
      }, err => {
        Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
      });
    });

  }

  iniciar(){
    
    setTimeout( ()=> {
      init();
    }, 1500);    
  
}
  async loadScript() {

    for (let x of this.scripts) {
      let node = document.createElement('script');
      node.src = x;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementById('scriptsTemp').appendChild(node);
      console.log("INSERTA SCRIPT");
      await sleep(100);
    }

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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