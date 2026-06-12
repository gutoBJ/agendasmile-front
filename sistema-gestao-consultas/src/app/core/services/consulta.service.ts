import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consulta {
  id?: number;
  idPaciente: number;
  idDentista: number;
  idUsuario?: number;
  descricao: string;
  motivoCancelamento?: string;
  dataInicio: string;
  dataFim: string;
  dataRegistro?: string;
  status?: string;
  nomePaciente?: string;
  nomeDentista?: string;
}

export interface CancelamentoRequest {
  motivoCancelamento: string;
}

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/consultas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  criar(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  atualizar(id: number, consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta);
  }

  cancelar(id: number, motivo: CancelamentoRequest): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/cancelar`, motivo);
  }
}