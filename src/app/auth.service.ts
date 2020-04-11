import { Injectable } from '@angular/core';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public jwtHelper: JwtHelperService = new JwtHelperService();

  public isAuthenticated(): boolean {
    try{
      const token = sessionStorage.getItem(environment.nameToken);
      console.log("token que saca");
      return !this.jwtHelper.isTokenExpired(token);  
    }catch(e){
      console.log('', e);
      return false;
    }
    
  }
}
