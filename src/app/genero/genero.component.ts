import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from './../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  public scripts: Array<string> = new Array();
  public peliculas: any;
  public generos: any;
  public ipImagenTMDB: string;
  public pageOfItems: Array<any>;
  public id: any;
  public nombre: any;

  constructor(private httpService: HttpService, private theMovieDataBaseService: TheMovieDataBaseService,
    private router: Router, private route: ActivatedRoute) {
    this.ipImagenTMDB = environment.ipImagenTMDB;
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p == undefined || p['id'] == undefined || p['nombre'] == undefined) {
        Swal.fire('Error', 'No se puede mostrar la película', 'error');
        return;
      }

      this.id = p['id'];
      this.nombre = p['nombre'];

      this.httpService.consultarPeliculaGenero(p['id']).subscribe((r: Array<string>) => {
        if (r == null || r == undefined) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        if (r.length == 0) {
          Swal.fire('Error', 'No se puede mostrar la película', 'error');
          return;
        }
        this.peliculas = r;
      });

      this.httpService.consultarGeneros().subscribe(result => {
        this.generos = result;
      }, err => {
        Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
      });

    });

    this.scripts.push("../../assets/cartelera/js/jquery.js");
    this.scripts.push("../../assets/cartelera/js/plugins.js");
    this.scripts.push("../../assets/cartelera/js/plugins2.js");
    this.scripts.push("../../assets/cartelera/js/custom.js");
    this.loadScript();

  }

  pedirPelicula() {
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

  enviarComentario(info) {
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

