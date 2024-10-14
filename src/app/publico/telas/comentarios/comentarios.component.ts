import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  opcoes = false;
  idEvento: any;
  nome: any;
  comentario: any;
  mesa: any;


  ionViewWillEnter() {
    this.comentario = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });
  }

  enviarComentario() {
    const missingFields = [];

    if (!this.nome) {
      missingFields.push('Nome');
      document.getElementById('nome')!.style.borderColor = 'red';
    } else {
      document.getElementById('nome')!.style.borderColor = '';
    }

    if (!this.comentario) {
      missingFields.push('Comentário');
      document.getElementById('comentario')!.style.borderColor = 'red';
    } else {
      document.getElementById('comentario')!.style.borderColor = '';
    }

    if (missingFields.length === 0) {
      //ok
    } else {
      const missingFieldsMessage = missingFields.join(', ');
      this.snackBar.open(`Preencha os campos: ${missingFieldsMessage}`, 'Fechar', {
        duration: 3000,
      });
    }
  }


  onNome() {
    document.getElementById('nome')!.style.borderColor = '';
  }

  onComentario() {
    document.getElementById('comentario')!.style.borderColor = '';
  }


}
