import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css'
})
export class Cadastrar {
  titulo = 'Cadastro de Medicamentos';
  medicamento: Medicamento = {} as Medicamento;
  medicamentoCadastrado: Medicamento | null = null; 

  constructor(
    private service: MedicamentosService,
    private router: Router
  ) { }

  submeter() {
    this.medicamentoCadastrado = null;
    
    this.service.incluir(this.medicamento).subscribe({
        next: (response) => {
            this.medicamentoCadastrado = response;
            
            this.medicamento = {} as Medicamento; 

            console.log('Medicamento cadastrado:', response);
        },
        error: (err) => {
             console.error('Erro ao cadastrar medicamento:', err);
             alert('Falha ao cadastrar. Verifique a API.');
        }
    });
  }
}