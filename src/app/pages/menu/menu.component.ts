import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';
import { MenuService } from 'src/app/_service/menu.service';
import { RolService } from 'src/app/_service/rol.service';
import { MenuDialogoComponent } from './menu-dialogo/menu-dialogo.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['idMenu', 'icono', 'nombre', 'url', 'roles', 'acciones'];
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageSize: number = this.pageSizeOptions[0];
  totalElements: number = 0;
  nombreMenu: string = '';
  idMenu: number;

  dataSource: MatTableDataSource<Menu>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  roles: Rol[];

  constructor(
    private menuService: MenuService,
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

  this.menuService.listarPageable(0, this.pageSizeOptions[0]).subscribe(data => {
    // console.log(data.content);
    this.totalElements = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter) =>
    data.nombre.indexOf(filter) !== -1;
  });

  this.menuService.getMenuCambio().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });

  this.menuService.getMensajeCambio().subscribe(data =>{
    this.snackBar.open(data, 'EXITO', {duration: 2000});
  });

}

compareRolesFn(Objeto1: any, Objeto2: any){
  return Objeto1.idMenu === Objeto2.idMenu;
}

filtrar(valor: string) {
  this.dataSource.filter = valor.trim().toLowerCase();
}

mostrarMas(e: any) {
  this.menuService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
    this.totalElements = data.totalElements;
    this.dataSource = new MatTableDataSource(data.content);
    this.dataSource.sort = this.sort;
  });
}


eliminar(id: any){
  this.menuService.eliminar(id).pipe(switchMap(() => {
    return this.menuService.listar();
  })).subscribe(data => {
    this.menuService.setMenuCambio(data);
    this.menuService.setMensajeCambio('SE ELIMINO.');
  });
}

ventanaDialogo(id: any){
  let men: Menu;
  let titulo = '';

  if(id > 0){
    titulo = 'Edicion';
    this.dataSource.filteredData.forEach(data => {
      if(data.idMenu === id) { men = data; }
    });
  }
  else{
    titulo = 'Nuevo';
    men = new Menu();
  }
  this.dialog.open(MenuDialogoComponent, {
    width: '50%',
    data: { id: id, title: titulo, datos: men, roles: this.roles }
  });
}

}
