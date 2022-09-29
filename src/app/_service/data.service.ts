import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  idPaciente: number;
  idSignos: number;
  paciente: Paciente;

  constructor() { }

}
