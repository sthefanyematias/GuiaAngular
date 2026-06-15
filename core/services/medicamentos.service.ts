
import { Injectable } from '@angular/core';
import { Medicamento } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicamentosService {
  private readonly API = '/medicamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.API);
  }

  incluir(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.API, medicamento);
  }

  excluir(id: number): Observable<Medicamento> {
    return this.http.delete<Medicamento>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<Medicamento | undefined> {
    return this.http.get<Medicamento>(`${this.API}/${id}`);
  }

  editar(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.API}/${medicamento.id}`, medicamento);
  }
}
