import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import * as QRCode from 'qrcode';


@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.scss'],
})
export class CompartilharComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private toastController: ToastController
  ) { }

  idEvento: any;
  isInicioRoute: boolean = false;
  urlCompartilhar: any;
  qrCodeUrl: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });
    this.urlCompartilhar = `${window.location.origin}/${this.idEvento}/home`;
    this.criaQrcode();
  }

  criaQrcode() {
    QRCode.toDataURL(this.urlCompartilhar, { errorCorrectionLevel: 'H' })
      .then((url: any) => {
        // Aqui você pode definir a URL do QR Code, por exemplo, para exibir no componente
        this.qrCodeUrl = url;
      })
      .catch((err: any) => {
        console.error('Erro ao gerar QR Code: ', err);
      });
  }

  copiarLink() {
    const link = this.urlCompartilhar;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(async () => {
        const toast = await this.toastController.create({
          message: 'Link copiado para a área de transferência!',
          duration: 6000,
          buttons: [
            {
              text: 'Fechar',
              role: 'cancel'
            }
          ]
        });
        toast.present();
      }, (err) => {
        console.error('Erro ao copiar o link: ', err);
      });
    } else {
      // Alternativa para navegadores que não suportam navigator.clipboard
      this.copiarTextoFallback(link);
    }
  }

  async copiarTextoFallback(texto: string) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      const toast = await this.toastController.create({
        message: 'Link copiado para a área de transferência!',
        duration: 6000,
        buttons: [
          {
            text: 'Fechar',
            role: 'cancel'
          }
        ]
      });
      toast.present();
    } catch (err) {
      console.error('Erro ao copiar o texto manualmente: ', err);
    }
    document.body.removeChild(textarea);
  }

}
