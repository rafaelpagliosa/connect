import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



import { PublicoPageRoutingModule } from './publico-routing.module';

import { ArtistaComponent } from './telas/artista/artista.component';
import { ComentariosComponent } from './telas/comentarios/comentarios.component';
import { InicioComponent } from './telas/inicio/inicio.component';
import { HomeComponent } from './telas/home/home.component';
import { SobreComponent } from './telas/sobre/sobre.component';
import { MusicasComponent } from './telas/musicas/musicas.component';
import { FotosComponent } from './telas/fotos/fotos.component';
import { CompartilharComponent } from './telas/compartilhar/compartilhar.component';
import { PostComponent } from './estruturais/post/post.component';
import { StoryComponent } from './estruturais/story/story.component';
import { LoginComponent } from './telas/login/login.component';


import { CarregamentoComponent } from './estruturais/carregamento/carregamento.component';
import { FooterComponent } from './estruturais/footer/footer.component';
import { HeaderComponent } from './estruturais/header/header.component';
import { ModalStoriesComponent } from './estruturais/modal-stories/modal-stories.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicoPageRoutingModule,
    MatIconModule,
  ],
  declarations: [
    ArtistaComponent,
    ComentariosComponent,
    InicioComponent,
    HomeComponent,
    SobreComponent,
    MusicasComponent,
    FotosComponent,
    CompartilharComponent,
    CarregamentoComponent,
    FooterComponent,
    HeaderComponent,
    ModalStoriesComponent,
    PostComponent,
    StoryComponent,
    LoginComponent,
  ],
  exports: [
    ArtistaComponent,
    ComentariosComponent,
    InicioComponent,
    HomeComponent,
    SobreComponent,
    MusicasComponent,
    FotosComponent,
    CompartilharComponent,
    CarregamentoComponent,
    FooterComponent,
    HeaderComponent,
    ModalStoriesComponent,
    PostComponent,
    StoryComponent,
    LoginComponent,
  ]
})
export class PublicoPageModule { }
