import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especialidade {
  id?: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class EspecialidadeService {
  private apiUrl = 'http://localhost:8080/especialidades';

  constructor(private http: HttpClient) {}

  listar(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.apiUrl);
  }

  criar(especialidade: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.apiUrl, especialidade);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}