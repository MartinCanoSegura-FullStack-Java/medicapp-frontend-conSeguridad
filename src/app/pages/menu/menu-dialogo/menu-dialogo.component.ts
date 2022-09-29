import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menu-dialogo',
  templateUrl: './menu-dialogo.component.html',
  styleUrls: ['./menu-dialogo.component.css']
})
export class MenuDialogoComponent implements OnInit {

  menu: Menu;
  titleDialog: string = '';
  roles: Rol[] = [];

  constructor(
    private dialogRef: MatDialogRef<MenuDialogoComponent>,  //para tener una referencia a la ventana de dialogo y poder cerrarla.
    @Inject(MAT_DIALOG_DATA) private data: any,
    private menuService: MenuService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.roles = this.data.roles;

    if(this.data.id > 0){
      this.menu = this.data.datos;
      this.titleDialog = this.data.title;
      this.roles = this.data.roles;
    } else {
        this.titleDialog = this.data.title;
        this.menu = new Menu();
        this.menu.idMenu = 0;
        this.menu.icono = '';
        this.menu.nombre = '';
        this.menu.url = '';
        this.menu.roles = this.roles;
    }
  }

  compareRolesFn(Objeto1: any, Objeto2: any){
    return Objeto1.idRol === Objeto2.idRol;
  }

  operar(){
    if (this.menu.idMenu > 0) {
      this.menuService.modificar(this.menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.setMenuCambio(data);
        this.menuService.setMensajeCambio('SE MODIFICO...');
      });
    } else {
      // this.menu.idMenu = 0;
      console.log(this.menu);
      this.menuService.registrar(this.menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.setMenuCambio(data);
        this.menuService.setMensajeCambio('SE CREO...');
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
