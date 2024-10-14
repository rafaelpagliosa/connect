import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastController } from '@ionic/angular';


import { ServicoMusicService } from '../../services/servico-music.service';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.scss'],
})
export class MusicasComponent implements OnInit {

  constructor(
    private router: Router,
    private musicService: ServicoMusicService,
    private snackBar: MatSnackBar,
    private toastController: ToastController
  ) { }

  consulta: string = '';
  faixas: any[] = [];
  artistas: any[] = [];
  listaSelecionada: any[] = [];
  tipoBusca: string = 'musica';
  modalAberto: boolean = false;

  ionViewWillEnter() {
    this.limparBusca();
  }

  ngOnInit() {
    this.limparBusca();
  }

  selecionarTipoBusca(tipo: string): void {
    this.tipoBusca = tipo;
    this.faixas = [];
    this.artistas = [];
    this.consulta = '';
  }

  buscar(): void {
    if (this.tipoBusca === 'musica') {
      this.musicService.buscarMusicas(this.consulta).subscribe({
        next: (response) => {
          this.faixas = response.recordings || [];
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else if (this.tipoBusca === 'artista') {
      this.musicService.buscarArtistas(this.consulta).subscribe({
        next: (response) => {
          this.artistas = response.artists || [];
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  async adicionarLista(faixa: any, event: Event): Promise<void> {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      // Adicionar item à lista se não estiver já presente
      const jaExiste = this.listaSelecionada.some(i => {
        return i.title === faixa.title &&
          i['artist-credit'][0]?.artist?.name === faixa['artist-credit'][0]?.artist?.name;
      });

      if (!jaExiste) {
        this.listaSelecionada.push(faixa);
      } else {
        const toast = await this.toastController.create({
          message: 'Item já está na lista',
          duration: 1000,
          buttons: [
            {
              text: 'Fechar',
              role: 'cancel'
            }
          ]
        });
        toast.present();
      }
    } else {
      // Remover item da lista se estiver presente
      this.listaSelecionada = this.listaSelecionada.filter(i => {
        return !(i.title === faixa.title &&
          i['artist-credit'][0]?.artist?.name === faixa['artist-credit'][0]?.artist?.name);
      });
    }
  }

  removerLista(item: any): void {
    this.listaSelecionada = this.listaSelecionada.filter(i => i !== item);
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal(event?: MouseEvent): void {
    if (event) {
      // Se um evento foi passado (clicar fora do modal)
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal-overlay')) {
        this.modalAberto = false;
      }
    } else {
      // Fechar o modal ao clicar no "X" ou ao enviar
      this.modalAberto = false;
    }
  }

  limparBusca(): void {
    this.consulta = '';
    this.faixas = [];
  }

}

