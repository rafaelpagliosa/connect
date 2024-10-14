import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistaComponent } from './telas/artista/artista.component';
import { ComentariosComponent } from './telas/comentarios/comentarios.component';
import { InicioComponent } from './telas/inicio/inicio.component';
import { HomeComponent } from './telas/home/home.component';
import { SobreComponent } from './telas/sobre/sobre.component';
import { MusicasComponent } from './telas/musicas/musicas.component';
import { FotosComponent } from './telas/fotos/fotos.component';
import { CompartilharComponent } from './telas/compartilhar/compartilhar.component';
import { LoginComponent } from './telas/login/login.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: ':id/home', component: HomeComponent },
  { path: ':id/sobre', component: SobreComponent },
  { path: ':id/comentarios', component: ComentariosComponent },
  { path: ':id/musicas', component: MusicasComponent },
  { path: ':id/artista', component: ArtistaComponent },
  { path: ':id/fotos', component: FotosComponent },
  { path: ':id/compartilhar', component: CompartilharComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoPageRoutingModule { }
