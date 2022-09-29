import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-usuario-dialogo',
  templateUrl: './usuario-dialogo.component.html',
  styleUrls: ['./usuario-dialogo.component.css']
})
export class UsuarioDialogoComponent implements OnInit {

  usuario: Usuario;
  titleDialog: string = '';
  roles: Rol[] = [];

  opciones = [
    { op: 'si', val: true },
    { op: 'no', val: false },
  ];

  constructor(
    private dialogRef: MatDialogRef<UsuarioDialogoComponent>,  //para tener una referencia a la ventana de dialogo y poder cerrarla.
    @Inject(MAT_DIALOG_DATA) private data: any,
    private usuarioService: UsuarioService
  ) {
    dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.roles = this.data.roles;

    if(this.data.id > 0){
      this.usuario = this.data.datos;
      this.titleDialog = this.data.title;
      this.roles = this.data.roles;
    } else {
        this.titleDialog = this.data.title;
        this.usuario = new Usuario();
        this.usuario.idUsuario = 0;
        this.usuario.username = '';
        this.usuario.password = '';
        this.usuario.enabled;
        this.usuario.roles = this.roles;
    }

  }

  compareRolesFn(Objeto1: any, Objeto2: any){
    return Objeto1.idRol === Objeto2.idRol;
  }


  operar(){
    if (this.usuario.idUsuario > 0) {
      this.usuarioService.modificar(this.usuario).pipe(switchMap(() => {
        return this.usuarioService.listar();
      })).subscribe(data => {
        this.usuarioService.setUsuarioCambio(data);
        this.usuarioService.setMensajeCambio('SE MODIFICO...');
      });
    } else {
      this.usuario.idUsuario = null;
      this.usuarioService.registrar(this.usuario).pipe(switchMap(() => {
        return this.usuarioService.listar();
      })).subscribe(data => {
        this.usuarioService.setUsuarioCambio(data);
        this.usuarioService.setMensajeCambio('SE CREO...');
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
