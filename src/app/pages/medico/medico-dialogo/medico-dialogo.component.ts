import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {


  medico: Medico;
  archivosSeleccionados: FileList;
  title: string;


  constructor(
    private dialogRef: MatDialogRef<MedicoDialogoComponent>,  //para tener una referencia a la ventana de dialogo y poder cerrarla.
    @Inject(MAT_DIALOG_DATA) private data: any,
    private medicoService: MedicoService,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.medico = new Medico();
    this.medico.idMedico = this.data.data.idMedico;
    this.medico.nombres = this.data.data.nombres;
    this.medico.apellidos = this.data.data.apellidos;
    this.medico.cmp = this.data.data.cmp;
    this.medico.fotoUrl = this.data.data.fotoUrl;
  }

  operar(){
    if (this.medico != null && this.medico.idMedico > 0) {
      //MODIFICAR
      this.medicoService.modificar(this.medico).pipe(switchMap( ()=> {
        // Si la Imagen es URL --> que se carge...
        // De lo contrario buscar la imagen en la tabla Archivo de la BD y Cargarla en la variable ALTERNA... switch local...
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        // Tomar el nombre del campo medico.fotoUrl y cargarla en la variable ALTERNA... switch local...
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

  seleccionarArchivo(e: any){
    this.archivosSeleccionados = e.target.files;
    this.medico.fotoUrl = e.target.files[0].name;
    this.consultaService.guardarArchivo(this.archivosSeleccionados.item(0)).subscribe();
  }

}
