import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './consultar.html',
  styleUrl: './consultar.css',
})
export class Consultar {
  idBusca: number | null = null; 
  medicamentoEncontrado: Medicamento | null = null; 
  erroBusca: string = ''; 
  constructor(private service: MedicamentosService) { }

  buscarMedicamento(): void {
    this.erroBusca = '';
    this.medicamentoEncontrado = null;

    if (this.idBusca) {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (medicamento) => {
          if (medicamento) {
            this.medicamentoEncontrado = medicamento;
          } else {
            this.erroBusca = `Medicamento com código ${this.idBusca} não encontrado.`;
          }
        },
        error: () => {
          this.erroBusca = 'Erro na comunicação com o servidor.';
        }
      });
    } else {
      this.erroBusca = 'Por favor, informe um código.';
    }
  }
}