import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dentista {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  cro: string;
  ativo: boolean;
}

@Injectable({ providedIn: 'root' })
export class DentistaService {
  private apiUrl = 'http://localhost:8080/dentistas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Dentista[]> {
    return this.http.get<Dentista[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Dentista> {
    return this.http.get<Dentista>(`${this.apiUrl}/${id}`);
  }

  criar(dentista: Dentista): Observable<Dentista> {
    return this.http.post<Dentista>(this.apiUrl, dentista);
  }

  atualizar(id: number, dentista: Dentista): Observable<Dentista> {
    return this.http.put<Dentista>(`${this.apiUrl}/${id}`, dentista);
  }

  desativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desativar`, {});
  }
}