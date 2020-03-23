import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import Swal from 'sweetalert2';
import { TheMovieDataBaseService } from '../the-movie-data-base.service';
import { environment } from './../../environments/environment';

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
    this.scripts.push("/assets/jsPelicula/scripts/jquery.js");
    this.scripts.push("/assets/jsPelicula/scripts/jquery-migrate-1.4.1.min.js");
    this.scripts.push("/assets/jsPelicula/scripts/spin.js");
    this.scripts.push("/assets/jsPelicula/scripts/custom.js");
    
   }

  ngOnInit() {

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
        console.log("--------------------> ", p['idTMDB']);
        this.descripcion = r[0]['description_Movie'];
        document.getElementById('contenedorVideo').innerHTML = '<div class="videoContainer self-video" id="video130" data-vidid="' + r[0]['url_movie'] + '"> <div class="closeVideo">&times;</div> </div>'
        for(let x = 1 ; x <= 1 ; x ++){
          this.imagenes.push(environment.direccion + p['idTMDB']+"/"+x+".jpg");
        }
        console.log('', this.imagenes);

        setTimeout( ()=> {
          this.loadScript();
        }, 500);
        
        /*this.theMovieDataBaseService.consultarImagenesPelicula(p['idTMDB']).subscribe(i => {
          for (let img of i['backdrops']) {
            this.imagenes.push(img);
          }
          setTimeout( ()=> {
            this.loadScript();
          }, 500);
          
        });*/

        
      }, err => {
        Swal.fire('Error', 'Ocurrió error: ' + err, 'error');
      });
    });

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

