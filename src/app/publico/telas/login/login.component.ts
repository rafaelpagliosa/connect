import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  codigo: any;

  senha: any;
  email: any;

  isLoading: boolean = false;


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
