import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { PacienteService } from 'src/app/_service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from 'events';
import { DataService } from 'src/app/_service/data.service';
import { Paciente } from 'src/app/_model/paciente';
import { SignosDTO } from 'src/app/_dto/signosDTO';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  idPacienteSeleccionado: number;
  titulo: string = "";
  nombrePaciente: String = '';


  idSignos: number;
  pulso: string;
  ritmo: string;
  temperatura: string;
  idPaciente: number;
  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  form: FormGroup;
  edicion: boolean = false;

  constructor(
    public dataService: DataService,
    private dialog: MatDialog,
    private snackBar : MatSnackBar,

    private signosService: SignosService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.idSignos = data['idSignos'];
      this.edicion = data['idSignos'] != null;
      this.initForm();
    });

    this.form = new FormGroup({
      'idSignos': new FormControl(0),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl(''),
      'fecha': new FormControl('')
    });
  }

  initForm(){
    if(this.edicion){
      this.titulo = "EDICION SIGNOS VITALES - ";
      this.signosService.listarPorIdS(this.idSignos).subscribe(data => {
        this.form = new FormGroup({
          'idSignos':  new FormControl(data.idSignos),
          'fecha': new FormControl(data.fecha),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmo),
          'temperatura': new FormControl(data.temperatura),

        });
      });

    } else {
      this.titulo = "NUEVOS SIGNOS VITALES";
      this.form = new FormGroup({
        'idSignos': new FormControl(0),
        'fecha': new FormControl(''),
        'pulso': new FormControl(''),
        'ritmo': new FormControl(''),
        'temperatura': new FormControl('')
      })
    }
  }

  get f() {
    return this.form.controls;
  }

  operar(){
    if(this.form.invalid){ return; }
      let signos = new Signos();

    signos.idSignos = this.form.value['idSignos'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmo = this.form.value['ritmo'];
    signos.temperatura = this.form.value['temperatura'];
    signos.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

    if(this.edicion){
      // modificar
      this.signosService.modificarSignos(signos).pipe(switchMap(() => {
        return this.signosService.listarPorIdPaciente(this.dataService.idPaciente);
      })).subscribe(data =>{
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SIGNOS FUERON ACTUALIZADOS... ');
      });
    }else{
      // registrar
      let signosDTO = new SignosDTO;
      signosDTO.signos = signos;
      signosDTO.idPaciente = this.dataService.idPaciente;

      this.signosService.registrarNuevo(signosDTO).subscribe(() => {
        this.signosService.listarPorIdPaciente(this.dataService.idPaciente)
        .subscribe(data => {
          this.signosService.setSignosCambio(data);
          this.signosService.setMensajeCambio('SE REGISTRO NUEVO SIGNOS...');
        });
      });
    }

    this.router.navigate(['/signos']);

  }


}
