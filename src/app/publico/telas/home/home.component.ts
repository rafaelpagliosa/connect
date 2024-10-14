import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalStoriesComponent } from '../../estruturais/modal-stories/modal-stories.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private toastController: ToastController
  ) { }

  currentRoute: any;
  idEvento: any;
  isTimerOver: boolean = false;
  isDown = false;
  startX: number = 0;
  scrollLeft: number = 0;
  isDragging: boolean = false;

  nomeArtista: string = 'DJ marsmelow';

  stories = [
    { id: 1, user: 'Mario', userId: '1', img: 'assets/stories/01.jpg' },
    { id: 2, user: 'Joana', userId: '1', img: 'assets/stories/02.jpg' },
    { id: 3, user: 'Rian', userId: '1', img: 'assets/stories/03.jpg' },
    { id: 4, user: 'Amanda', userId: '1', img: 'assets/stories/01.jpg' },
    { id: 5, user: 'Jonas', userId: '7', img: 'assets/stories/01.jpg' },
    { id: 6, user: 'Marcia', userId: '1', img: 'assets/stories/02.jpg' },
    { id: 7, user: 'Ana', userId: '5', img: 'assets/stories/03.jpg' },
    { id: 8, user: 'João', userId: '2', img: 'assets/stories/01.jpg' }
  ];


  imagens: string[] = [
    'assets/example.jpg',
    'assets/example2.jpg',
  ];
  currentIndex: number = 0;


  musicasMaisPedidas = [
    { title: 'Música 1', artist: 'Artista 1', liked: false },
    { title: 'Música 2', artist: 'Artista 2', liked: false },
    { title: 'Música 3', artist: 'Artista 3', liked: false }
  ];

  palavrasMaisUsadas = [
    { texto: 'Awesome', tamanho: 10 },
    { texto: 'Great', tamanho: 8 }
  ];

  totalParticipantes = 120;
  totalInteracoes = 200;

  ngOnInit(): void {

    const segments = this.router.url.split('/');
    this.currentRoute = segments.length > 1 ? segments[segments.length - 1] : '';

    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });


    this.embaralhaPosts();

  }


  mapPostType(type: string): 'image' | 'link' | 'text' | 'numeros' | 'musicas' {
    switch (type) {
      case 'image': return 'image';
      case 'link': return 'link';
      case 'text': return 'text';
      case 'numeros': return 'numeros';
      case 'musicas': return 'musicas';
      default: return 'text';  // Retorna 'text' como valor padrão
    }
  }

  posts = [
    {
      type: this.mapPostType('musicas'),
      content: {
        title: '',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: '',
        musicas: [
          { title: 'Música 1', artist: 'Artista 1', liked: false },
          { title: 'Música 2', artist: 'Artista 2', liked: false },
          { title: 'Música 3', artist: 'Artista 3', liked: false }
        ]
      }
    },
    {
      type: this.mapPostType('image'),  // Garantir que o tipo seja válido
      content: {
        title: 'Evento',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: 'Conheça o DJ',
        url: 'https://example.com',
        images: [
          'assets/example.jpg',
          'assets/example2.jpg'
        ]
      }
    },
    {
      type: this.mapPostType('link'),
      content: {
        title: 'Evento',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: 'Conheça o DJ',
        url: 'https://example.com',
      }
    },
    {
      type: this.mapPostType('image'),  // Garantir que o tipo seja válido
      content: {
        title: 'Evento',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: 'Conheça o DJ',
        url: 'https://example.com',
        images: [
          'assets/example.jpg',
          'assets/example2.jpg'
        ]
      }
    },
    {
      type: this.mapPostType('text'),
      content: {
        title: 'Evento',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: 'Conheça o DJ',
        url: 'https://example.com',
        text: 'Este é um post de texto'
      }
    },
    {
      type: this.mapPostType('numeros'),
      content: {
        title: 'Evento',
        profile: this.nomeArtista,
        imgProfile: 'assets/example.jpg',
        legenda: '',
        interacoes: 120,
        participantes: 12,
      }
    },

  ];

  embaralhaPosts(): void {
    for (let i = this.posts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.posts[i], this.posts[j]] = [this.posts[j], this.posts[i]]; // Troca os elementos
    }
  }

  roteamento(rota: string) {
    this.router.navigate([`evento/${this.idEvento}/${rota}`]);
  }





  //eventos do stories@HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - (event.target as HTMLElement).offsetLeft;
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - (event.target as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 1.5; // Ajuste a velocidade de arraste
    (event.target as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp(): void {
    this.isDragging = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].pageX - (event.target as HTMLElement).offsetLeft;
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const x = event.touches[0].pageX - (event.target as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 1.5; // Ajuste a velocidade de arraste
    (event.target as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    this.isDragging = false;
  }


  //FEED
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imagens.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.imagens.length) % this.imagens.length;
  }


  async toggleLike(index: number) {
    // Alterna o estado "liked"
    this.musicasMaisPedidas[index].liked = !this.musicasMaisPedidas[index].liked;

    // Exibe uma mensagem de feedback
    if (this.musicasMaisPedidas[index].liked) {
      const toast = await this.toastController.create({
        message: `${this.musicasMaisPedidas[index].title} foi hipada!`,
        duration: 1000,
        buttons: [
          {

          }
        ]
      });
      toast.present();
    }
  }

}
