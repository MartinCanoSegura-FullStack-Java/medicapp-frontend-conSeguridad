import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-roles-dialogo',
  templateUrl: './roles-dialogo.component.html',
  styleUrls: ['./roles-dialogo.component.css']
})
export class RolesDialogoComponent implements OnInit {

  rol: Rol;
  title: string = '';

  constructor(
    private dialogRef: MatDialogRef<RolesDialogoComponent>,  //para tener una referencia a la ventana de dialogo y poder cerrarla.
    @Inject(MAT_DIALOG_DATA) private data: any,
    private rolService: RolService
  ) { dialogRef.disableClose = true; }

  ngOnInit(): void {
    console.log(this.data);
    this.title = this.data.title;
    this.rol = new Rol();
    this.rol.idRol = this.data.data.idRol;
    this.rol.nombre = this.data.data.nombre;
    this.rol.descripcion = this.data.data.descripcion;
  }

  operar(){
    if(this.rol != null && this.rol.idRol >0){
      // modificar
      this.rolService.modificar(this.rol).pipe(switchMap(() => {
        return this.rolService.listar();
      })).subscribe(data => {
        this.rolService.setRolCambio(data);
        this.rolService.setMensajeCambio('SE MODIFO');
      });
    }
    else {
      //nuevo
      this.rolService.registrar(this.rol).pipe(switchMap(() => {
        return this.rolService.listar();
      })).subscribe(data => {
        this.rolService.setRolCambio(data);
        this.rolService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.cerrar();
  }

  cerrar(){ this.dialogRef.close(); }

}
