import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() type?: 'image' | 'link' | 'text' | 'numeros' | 'musicas';
  @Input() content: any;
  currentIndex: number = 0;

  showOptions: string | null = null;

  // Variáveis para armazenar a lista de posts embaralhados
  posts: any[] = [];

  constructor(
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  // Função para embaralhar a ordem dos posts


  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.content.images.length) % this.content.images.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.content.images.length;
  }

  async toggleLike(index: number) {
    this.content.musicas[index].liked = !this.content.musicas[index].liked;
    const toast = await this.toastController.create({
      message: 'Música Hipada!',
      duration: 500,
    });
    toast.present();
  }

  toggleOptions(postType: string) {
    this.showOptions = this.showOptions === postType ? null : postType;
    console.log("CLicou", postType);
  }

}
