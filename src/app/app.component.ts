import { Component, HostListener, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { DataService } from './_service/data.service';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menus: Menu[];

  usuarioLogeado: string = '';
  permisos: string = '';

  constructor(
    private menuService : MenuService,
    public loginService: LoginService,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });

    this.loginService.getUserAuthorities().subscribe(data => {
      this.permisos = '';
      this.usuarioLogeado = '';


      if(data.authorities != null && data.authorities.length > 0) {
        this.usuarioLogeado = data.userName + '  - ';
        data.authorities.forEach(a => {
          this.permisos = this.permisos + ' ' + a + ' |';
        });
        this.permisos = this.permisos.substring(0, this.permisos.length - 1);
      }
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any){
    this.loginService.cerrarSesion();
    return false;
  }

}
