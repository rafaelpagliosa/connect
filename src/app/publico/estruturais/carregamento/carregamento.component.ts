import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carregamento',
  templateUrl: './carregamento.component.html',
  styleUrls: ['./carregamento.component.scss'],
})
export class CarregamentoComponent  implements OnInit {

  @Input() message: string = 'Carregando, por favor aguarde...';

  constructor() { }

  ngOnInit() {}

}
