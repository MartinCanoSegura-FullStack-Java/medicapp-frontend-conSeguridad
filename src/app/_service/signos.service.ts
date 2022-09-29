import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignosDTO } from '../_dto/signosDTO';
import { Signos } from '../_model/signos';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})

export class SignosService extends GenericService<Signos>  {

  private signosCambio = new Subject<Signos[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signos`
    );
  }

  listarPageable(p: number, s:number, idP: number){
    return this.http.get<any>(`${this.url}/pageable/${idP}?page=${p}&size=${s}`);
  }

  listarPorIdPaciente(idP: number){
    return this.http.get<any>(`${this.url}/${idP}`);
  }

  listarPorIdS(idS: number){
    return this.http.get<any>(`${this.url}/listarPorIdS/${idS}`);
  }

  modificarSignos(s: Signos){
    return this.http.put<any>(this.url, s);
  }

  registrarNuevo(s: SignosDTO){
    return this.http.post<any>(this.url, s);
  }

  delete(idS: number){
    return this.http.delete(`${this.url}/${idS}`);
  }


  getSignosCambio(){
    return this.signosCambio.asObservable();
  }

  setSignosCambio(signos : Signos[]){
    this.signosCambio.next(signos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
