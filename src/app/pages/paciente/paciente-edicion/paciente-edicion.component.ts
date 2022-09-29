import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { switchMap } from 'rxjs/operators';
import { Signos } from 'src/app/_model/signos';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  titulo: string = "";
  signos: Signos[] = [];
  totalSignos: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'direccion': new FormControl(''),
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    this.titulo = "Nuevo";
    if (this.edicion) {
      this.titulo = "Edicion";
      this.pacienteService.listarPorId(this.id).subscribe(data => {
        this.signos = data.signos;
        this.totalSignos = this.signos.length;
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres, [Validators.required, Validators.minLength(3)]),
          'apellidos': new FormControl(data.apellidos, Validators.required),
          'dni': new FormControl(data.dni),
          'telefono': new FormControl(data.telefono),
          'email': new FormControl(data.email),
          'direccion': new FormControl(data.direccion)
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  operar() {
    if (this.form.invalid) { return; }

    let paciente = new Paciente(
          this.form.value['id'],
          this.form.value['nombres'],
          this.form.value['apellidos'],
          this.form.value['dni'],
          this.form.value['direccion'],
          this.form.value['telefono'],
          this.form.value['email'],
          this.totalSignos,
          this.signos
    );

    if (this.edicion) {
      //MODIFICAR
      //PRACTICA COMUN
      /*this.pacienteService.modificar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.setPacienteCambio(data);
          this.pacienteService.setMensajeCambio('SE MODIFICO');
        });
      });*/
      //PRACTICA IDEAL
      this.pacienteService.modificar(paciente).pipe(switchMap(() => {
        return this.pacienteService.listar();
      }))
      .subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio('SE MODIFICO');
      });

    } else {
      //REGISTRAR
      this.pacienteService.registrar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.setPacienteCambio(data);
          this.pacienteService.setMensajeCambio('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['paciente']);

  }

}
