import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private toastController: ToastController
  ) { }

  codigo: any;
  isLoading: boolean = false;

  ngOnInit() { }

  async entrar() {
    if (this.codigo) {
      this.isLoading = true;
      this.router.navigate([`evento/${this.codigo}/home`]);
    } else {
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'Código Inválido!',
        duration: 6000,
        buttons: [
          {
            text: 'Fechar',
            role: 'cancel'
          }
        ]
      });
      toast.present();
    }
  }


}
