import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  roteamento(rota: string) {
    console.log("Clicou");
    this.router.navigate([`/10/${rota}`]);
  }

}
