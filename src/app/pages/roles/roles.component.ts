import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';
import { RolesDialogoComponent } from './roles-dialogo/roles-dialogo.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  displayedColumns = ['idRol', 'descripcion', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Rol>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalElements: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageSize: number = this.pageSizeOptions[0];

  constructor(
    private rolesService: RolService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rolesService.listarPageable(0, this.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) =>
        // data.signosPK.paciente.nombres.toLocaleLowerCase().indexOf(filter) !== -1 ||
        // data.signosPK.paciente.apellidos.toLocaleLowerCase().indexOf(filter) !== -1 ||
        // data.signosPK.idSignos.toString().indexOf(filter) !== -1 ||
        data.descripcion.indexOf(filter) !== -1 ||
        data.nombre.indexOf(filter) !== -1;
    });

    this.rolesService.getRolCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.rolesService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'aviso', {duration: 2000});
    });

  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMas(e: any) {
    this.rolesService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: any){
    this.rolesService.eliminar(id).subscribe(() => {
      this.rolesService.listar().subscribe(data => {
        this.rolesService.setRolCambio(data);
        this.rolesService.setMensajeCambio('SE ELIMINO...');
      });
    });
  }

  abrirDialogo(rol?: Rol) {
    console.log(rol);
    let titulo = rol != null ? 'Edicion' : 'Nuevo';
    let role = rol != null ? rol : new Rol();
      let dialoRef = this.dialog.open(RolesDialogoComponent, {
        width: '450px',
        data: { data: role, title: titulo }
      });
    }

}
