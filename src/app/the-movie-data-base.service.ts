import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TheMovieDataBaseService {

  constructor(private httpClient: HttpClient) { }


  /**
   * 
   * @param idTmDb 
   */
  consultarImagen(idTmDb){

    return this.httpClient.get(environment.ipBaseTMDB+idTmDb+'?language=es-ES&api_key='+environment.keyTMDB);

  }

  /**
   * 
   * @param idTmDb 
   */
  consultarImagenesPelicula(idTmDb){

    return this.httpClient.get(environment.ipBaseTMDB+idTmDb+'/images?api_key='+environment.keyTMDB);

  }



}
