import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../../core/types/types';
import { MedicamentosService } from '../../core/services/medicamentos.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, CurrencyPipe],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class Listar implements OnInit {
  listaMedicamentos: Medicamento[] = [];

  constructor(
    private service: MedicamentosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  carregarMedicamentos(): void {
        this.service.listar().subscribe({
            next: (medicamentos) => {
                this.listaMedicamentos = medicamentos;
            },
            error: (err) => {
                console.error('Falha na comunicação com o JSON-Server:', err);
                alert('ERRO: Não foi possível carregar a lista de medicamentos. Verifique a API.');
            }
        });
    }

    excluir(id: number): void { 
        if (id) {
            this.service.excluir(id).subscribe({
                next: () => {
                    this.listaMedicamentos = this.listaMedicamentos.filter(
                        medicamento => medicamento.id !== id
                    );
                    console.log(`Medicamento ID ${id} excluído de forma imediata.`);
                },
                error: (err) => {
                    console.error('Erro ao excluir medicamento:', err);
                    alert('Falha ao excluir. Verifique a conexão com o servidor. (A exclusão foi bloqueada)');
                }
            });
        }
    }
}