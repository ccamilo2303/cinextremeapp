import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from './../../environments/environment';


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

  
  constructor(private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService, private router: Router) {
    this.ipImagenTMDB = environment.ipImagenTMDB;
   }

  ngOnInit() {
    this.scripts.push("../../assets/cartelera/js/jquery.js");
    this.scripts.push("../../assets/cartelera/js/plugins.js");
    this.scripts.push("../../assets/cartelera/js/plugins2.js");
    this.scripts.push("../../assets/cartelera/js/custom.js");
    this.loadScript();


    this.httpService.consultarCartelera().subscribe(result => {
      this.peliculas = result;
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });


    this.httpService.consultarGeneros().subscribe(result => {
      this.generos = result;
    }, err => {
      Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
    });

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
        this.enviarComentario(JSON.stringify(result.value));
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

  enviarComentario(info){
    console.log("Info: ", info);
  }
  /**
   * 
   * @param pageOfItems 
   */
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  /**
   * @param id 
   * @param name 
   */
  consultarGenero(id, name){
    this.router.navigate(['/genero', id, name]);
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

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
