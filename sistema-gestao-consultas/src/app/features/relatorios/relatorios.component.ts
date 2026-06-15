import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaService, Consulta } from '../../core/services/consulta.service';
import { PacienteService, Paciente } from '../../core/services/paciente.service';
import { DentistaService, Dentista } from '../../core/services/dentista.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss'
})
export class RelatoriosComponent implements OnInit {
  form: FormGroup;
  consultas: Consulta[] = [];
  pacientes: Paciente[] = [];
  dentistas: Dentista[] = [];
  colunas = ['paciente', 'dentista', 'dataInicio', 'dataFim', 'status'];
  carregando = false;
  erro = '';

  statusOpcoes = ['AGENDADA', 'FINALIZADA', 'CANCELADA'];

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
  ) {
    this.form = this.fb.group({
      idPaciente:  [null],
      idDentista:  [null],
      status:      [null],
      dataInicio:  [null],
      dataFim:     [null],
    });
  }

  ngOnInit() {
    this.pacienteService.listar().subscribe(p => this.pacientes = p);
    this.dentistaService.listar().subscribe(d => this.dentistas = d);
    this.buscar();
  }

  buscar() {
    this.carregando = true;
    this.consultaService.listar().subscribe({
      next: (dados) => {
        this.consultas = this.filtrar(dados);
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar relatório.';
        this.carregando = false;
      }
    });
  }

  filtrar(consultas: Consulta[]): Consulta[] {
    const { idPaciente, idDentista, status, dataInicio, dataFim } = this.form.value;

    return consultas.filter(c => {
      if (idPaciente && c.idPaciente !== idPaciente) return false;
      if (idDentista && c.idDentista !== idDentista) return false;
      if (status && c.status !== status) return false;
      if (dataInicio && new Date(c.dataInicio) < new Date(dataInicio)) return false;
      if (dataFim && new Date(c.dataFim) > new Date(dataFim)) return false;
      return true;
    });
  }

  limpar() {
    this.form.reset();
    this.buscar();
  }
}