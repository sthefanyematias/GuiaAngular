import { Cabecalho } from './../../pages/cabecalho/cabecalho';
import { Rodape } from './../../pages/rodape/rodape';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Cabecalho, Rodape],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Farmácia';
}