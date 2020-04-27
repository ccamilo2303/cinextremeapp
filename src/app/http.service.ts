import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  consultarCartelera(){

    return this.httpClient.get(environment.ipServicio+'consulta');

  }
  
  consultarCarteleraUrl(url){

    return this.httpClient.get(url);

  }

  consultarPelicula(id){

    return this.httpClient.get(environment.ipServicio+'pelicula/'+id);
    
  }

  consultarTrailer(id){

    return this.httpClient.get(environment.ipServicio+'trailer/'+id);
    
  }

  consultarGeneros(){

    return this.httpClient.get(environment.ipServicio+'lista-generos');

  }

  consultarPeliculaGenero(id){

    return this.httpClient.get(environment.ipServicio+'consulta-genero/'+id);

  }
  
  validarUsuario(email){
    return this.httpClient.get(environment.ipServicio+'valsuscripcion?email='+email);
  }

  solicitudPelicula(info){
    return this.httpClient.get(environment.ipServicio+'pedir-pelicula?'+info);
  }

}
