import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentosService } from '../../core/services/medicamentos.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css'
})
export class Excluir {
 idExcluir: number | null = null; 
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(private service: MedicamentosService) { }

  excluirMedicamento(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';
    
   if (this.idExcluir != null) { 
      
      if (!confirm(`Tem certeza que deseja EXCLUIR o medicamento de ID ${this.idExcluir}?`)) {
        return;
      }
      
      this.service.excluir(this.idExcluir).subscribe({
        next: () => {
          this.mensagemSucesso = `Medicamento com ID ${this.idExcluir} excluído com sucesso.`;
          this.idExcluir = null; 
        },
        error: (err) => {
          this.erroMensagem = `Erro ao excluir o medicamento.`;
          console.error('Erro de exclusão:', err);
        }
      });
    } else {
        this.erroMensagem = 'Por favor, informe um ID para exclusão.';
    }
  }
}