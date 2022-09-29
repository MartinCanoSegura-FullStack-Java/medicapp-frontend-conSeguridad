import { DataSource } from '@angular/cdk/table';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { DataService } from 'src/app/_service/data.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  displayedColumns = ['idSignos', 'fecha', 'pulso', 'ritmo', 'temperatura',  'acciones'];
  dataSource: MatTableDataSource<Signos>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalElements: number = 0;

  nombrePaciente: string = '';
  titulo: string = 'Usuarios';

  idSignos: number;
  idPaciente: number;

  signos: Signos[] = [];

  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pageSize: number = this.pageSizeOptions[0];


  constructor(
    private signosService: SignosService,
    private pacienteService: PacienteService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.pacienteService.listarPorId(this.dataService.idPaciente).subscribe(data => {
      this.nombrePaciente = data.nombres.toUpperCase() + '  ' + data.apellidos.toUpperCase();
    });

    this.signosService.listarPageable(0, this.pageSizeOptions[0], this.dataService.idPaciente).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) =>
        // data.signosPK.paciente.nombres.toLocaleLowerCase().indexOf(filter) !== -1 ||
        // data.signosPK.paciente.apellidos.toLocaleLowerCase().indexOf(filter) !== -1 ||
        // data.signosPK.idSignos.toString().indexOf(filter) !== -1 ||
        data.fecha.indexOf(filter) !== -1 ||
        data.pulso.indexOf(filter) !== -1 ||
        data.ritmo.indexOf(filter) !== -1 ||
        data.temperatura.indexOf(filter) !== -1;
    });

    this.signosService.getSignosCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signosService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'EXITO', {duration: 2000});
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  // this.signosService.listarPageable(0, this.pageSizeOptions[0], this.dataService.idPaciente).subscribe(data => {
  eliminar(idSignos: any) {
    this.signosService.delete(idSignos).subscribe(() => {
      this.signosService.listarPorIdPaciente(this.dataService.idPaciente).subscribe(data => {
        this.signosService.setSignosCambio(data);
        this.signosService.setMensajeCambio('SE ELIMINO...');
      });
    });

  }

  mostrarMas(e: any) {
    this.signosService.listarPageable(e.pageIndex, e.pageSize, this.dataService.idPaciente).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }



}
