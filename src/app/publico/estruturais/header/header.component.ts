import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private toastController: ToastController
  ) { }

  opcoes = false;
  perfil = false;
  idEvento: any;
  nome = "Joana Silva";
  isDarkTheme: boolean = false;
  theme: string | null = null;
  isInicioRoute: boolean = false;
  qrCodeUrl: any;
  currentRoute: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });

    this.isInicioRoute = this.router.url === '/evento/inicio' || this.router.url === '/evento/login';

    this.router.events.subscribe(() => {
      this.isInicioRoute = this.router.url === '/evento/inicio' || this.router.url === '/evento/login';
    });


    this.currentRoute = this.route.snapshot.routeConfig?.path || '';

    this.theme = localStorage.getItem('theme');
    if (this.theme) {
      document.body.classList.add(this.theme);
      this.isDarkTheme = this.theme === 'dark';
    } else {
      this.theme = 'light';
      document.body.classList.add(this.theme);
      this.isDarkTheme = false;
    }
  }

  toqueOpcoes() {
    this.opcoes = !this.opcoes;
  }

  toquePerfil(event: MouseEvent) {
    event.stopPropagation(); // Impede que o evento de clique se propague para o document
    this.perfil = !this.perfil;
  }

  async reloadPage() {
    const toast = await this.toastController.create({
      message: 'Recarregando...',
      duration: 2000,
    });
    toast.present();
    this.router.navigate([this.router.url]);
  }

  roteamento(rota: string) {
    if (rota == 'inicio') {
      this.router.navigate([`evento/${rota}`]);
    } else {
      this.router.navigate([`evento/${this.idEvento}/${rota}`]);
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(this.theme);
    this.isDarkTheme = this.theme === 'dark';
  }

  sair() {
    if (this.currentRoute.includes('home')) {
      this.router.navigate([`evento/inicio`]);
    } else {
      this.router.navigate([`evento/${this.idEvento}/home`]);
    }
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  fecharMenuSeClicarFora(event: Event) {
    const clicadoDentroDoMenu = (event.target as HTMLElement).closest('.notificacao');
    const clicadoDentroDoPerfil = (event.target as HTMLElement).closest('.perfil');

    // Fecha o menu se clicou fora dele
    if (!clicadoDentroDoMenu && this.opcoes) {
      this.opcoes = false;
    }

    // Fecha o perfil se clicou fora dele
    if (!clicadoDentroDoPerfil && this.perfil) {
      this.perfil = false;
    }
  }
}
