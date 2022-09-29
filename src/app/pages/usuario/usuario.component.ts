import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Rol } from 'src/app/_model/rol';
import { Usuario } from 'src/app/_model/usuario';
import { RolService } from 'src/app/_service/rol.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['idUsuario', 'nombre', 'enabled', 'roles', 'acciones'];
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageSize: number = this.pageSizeOptions[0];
  totalElements: number = 0;
  nombreUsuario: string = '';
  tiulo: string = '';
  idUsuario: number;

  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  roles: Rol[];

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
     //Todos los Roles Existentes en BD
     this.rolesService.listar().subscribe(data => {
      this.roles = data;
    });

    this.usuarioService.listarPageable(0, this.pageSizeOptions[0]).subscribe(data => {
      // console.log(data.content);
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) =>
      data.username.indexOf(filter) !== -1;
    });

    this.usuarioService.getUsuarioCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.usuarioService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'EXITO', {duration: 2000});
    });

  }

  compareRolesFn(Objeto1: any, Objeto2: any){
    return Objeto1.idRol === Objeto2.idRol;
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMas(e: any) {
    this.usuarioService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }


  eliminar(id: any){
    this.usuarioService.eliminar(id).pipe(switchMap(() => {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.setUsuarioCambio(data);
      this.usuarioService.setMensajeCambio('SE ELIMINO.');
    });
  }

  ventanaDialogo(id: any){
    let usr: Usuario;
    let titulo = '';

    if(id > 0){
      titulo = 'Edicion';
      this.dataSource.filteredData.forEach(data => {
        if(data.idUsuario === id) { usr = data; }
      });
    }
    else{
      titulo = 'Nuevo';
      usr = new Usuario();
    }
    this.dialog.open(UsuarioDialogoComponent, {
      width: '50%',
      data: { id: id, title: titulo, datos: usr, roles: this.roles }
    });
  }

}
