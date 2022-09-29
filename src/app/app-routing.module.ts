import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ConsultaEspecialComponent } from './pages/consulta-especial/consulta-especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { AplicativoComponent } from './pages/indice/aplicativo/aplicativo.component';
import { BackendComponent } from './pages/indice/backend/backend.component';
import { BaseDatosComponent } from './pages/indice/bd/base-datos/base-datos.component';
import { ModeloComponent } from './pages/indice/bd/modelo/modelo.component';
import { FrontendComponent } from './pages/indice/frontend/frontend.component';
import { FuncionalidadComponent } from './pages/indice/funcionalidad/funcionalidad.component';
import { HomeComponent } from './pages/indice/home/home.component';
import { IndiceComponent } from './pages/indice/indice.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { MenuComponent } from './pages/menu/menu.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SignosEdicionComponent } from './pages/signos/signos-edicion/signos-edicion.component';
import { SignosComponent } from './pages/signos/signos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GuardService } from './_service/guard.service';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'indice', component: IndiceComponent, children: [
    { path: 'aplicativo', component: AplicativoComponent },
    { path: 'frontend', component: FrontendComponent },
    { path: 'backend', component: BackendComponent },
    { path: 'home', component: HomeComponent },
    { path: 'baseDatos', component: BaseDatosComponent },
    { path: 'modeloRelacional', component:  ModeloComponent},
    { path: 'funcionalidad', component: FuncionalidadComponent }
  ]},
  { path: 'roles', component: RolesComponent },
  { path: 'menus', component: MenuComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [GuardService] },
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'signos', component: SignosComponent, children: [
    { path: 'nuevo', component: SignosEdicionComponent },
    { path: 'edicion/:idSignos', component: SignosEdicionComponent }
  ]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'consulta-wizard', component: WizardComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: ConsultaEspecialComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
