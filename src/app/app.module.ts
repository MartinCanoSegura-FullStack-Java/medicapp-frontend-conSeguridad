import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta-especial/consulta-especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './pages/buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SignosComponent } from './pages/signos/signos.component';
import { SignosEdicionComponent } from './pages/signos/signos-edicion/signos-edicion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioDialogoComponent } from './pages/usuario/usuario-dialogo/usuario-dialogo.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuDialogoComponent } from './pages/menu/menu-dialogo/menu-dialogo.component';
import { RolesComponent } from './pages/roles/roles.component';
import { RolesDialogoComponent } from './pages/roles/roles-dialogo/roles-dialogo.component';
import { IndiceComponent } from './pages/indice/indice.component';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from 'ng-material-multilevel-menu';
import { HomeComponent } from './pages/indice/home/home.component';
import { FuncionalidadComponent } from './pages/indice/funcionalidad/funcionalidad.component';
import { ModeloComponent } from './pages/indice/bd/modelo/modelo.component';
import { BackendComponent } from './pages/indice/backend/backend.component';
import { FrontendComponent } from './pages/indice/frontend/frontend.component';
import { AplicativoComponent } from './pages/indice/aplicativo/aplicativo.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    MedicoComponent,
    PacienteEdicionComponent,
    MedicoDialogoComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    EspecialidadComponent,
    EspecialidadEdicionComponent,
    ConsultaComponent,
    ConsultaEspecialComponent,
    WizardComponent,
    BuscarComponent,
    BuscarDialogoComponent,
    ReporteComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    RecuperarComponent,
    TokenComponent,
    PerfilComponent,
    SignosComponent,
    SignosEdicionComponent,
    UsuarioComponent,
    UsuarioDialogoComponent,
    MenuComponent,
    MenuDialogoComponent,
    RolesComponent,
    RolesDialogoComponent,
    IndiceComponent,
    HomeComponent,
    FuncionalidadComponent,
    ModeloComponent,
    BackendComponent,
    FrontendComponent,
    AplicativoComponent,
    InicioComponent
  ],
  //entryComponents:[ MedicoDialogoComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    NgMaterialMultilevelMenuModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(8)],
        disallowedRoutes: [`http://${environment.HOST.substring(8)}/login/enviarCorreo`],
      },
    }),
  ],
  providers: [
    MultilevelMenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
