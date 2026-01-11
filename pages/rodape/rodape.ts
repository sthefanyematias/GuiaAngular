import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rodape.html',
  styleUrls: ['./rodape.css']
})
export class Rodape {
  currentYear: number = new Date().getFullYear();
}