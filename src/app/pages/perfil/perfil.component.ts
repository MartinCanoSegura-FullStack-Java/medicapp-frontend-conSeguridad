import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre_usuario: string = '';
  authorities: [] = [];
  role: string = '';

  constructor() { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);

    this.nombre_usuario = decodedToken.user_name;
    this.authorities = decodedToken.authorities;

    if(this.authorities.length > 1){
      this.role = "ROLES: ";
      for(let i=0; i<this.authorities.length; i++){
        this.role = this.role.concat(" | ").concat(this.authorities[i]);
      }
    }else{
      let i = 0;
        this.role = "ROL: ".concat(this.authorities[i]);
    }
  }

}
