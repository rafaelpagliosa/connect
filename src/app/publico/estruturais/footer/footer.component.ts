import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  currentRoute: any;
  idEvento: any;

  isFooterHidden: boolean = false;
  lastScrollTop: number = 0;

  ngOnInit(): void {

    const segments = this.router.url.split('/');
    this.currentRoute = segments.length > 1 ? segments[segments.length - 1] : '';

    this.route.paramMap.subscribe(params => {
      this.idEvento = params.get('id');
    });

  }

  roteamento(rota: string) {
    this.router.navigate([`evento/${this.idEvento}/${rota}`]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollTop = (event.target as Document).documentElement.scrollTop || (event.target as Document).body.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.isFooterHidden = true;
    } else {
      this.isFooterHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

}
