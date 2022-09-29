import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/usuario';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{

  private usuarioCambio = new BehaviorSubject<Usuario[]>([]);
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/usuarios`);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorUsuario(nombre: string) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<Usuario[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }


  // ----------------------- getters / setters -------------------------------
  getUsuarioCambio() {
    return this.usuarioCambio.asObservable();
  }

  setUsuarioCambio(usuario: Usuario[]) {
    this.usuarioCambio.next(usuario);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
