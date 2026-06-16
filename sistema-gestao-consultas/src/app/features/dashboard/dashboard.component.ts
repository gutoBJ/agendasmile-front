import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { ConsultaService } from '../../core/services/consulta.service';
import { PacienteService } from '../../core/services/paciente.service';
import { DentistaService } from '../../core/services/dentista.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalConsultas = 0;
  consultasAgendadas = 0;
  consultasCanceladas = 0;
  totalPacientes = 0;
  totalDentistas = 0;
  carregando = true;

  constructor(
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    forkJoin({
      consultas:  this.consultaService.listar(),
      pacientes:  this.pacienteService.listar(),
      dentistas:  this.dentistaService.listar(),
    }).subscribe({
      next: ({ consultas, pacientes, dentistas }) => {
        this.totalConsultas      = consultas.length;
        this.consultasAgendadas  = consultas.filter(c => c.status === 'AGENDADA').length;
        this.consultasCanceladas = consultas.filter(c => c.status === 'CANCELADA').length;
        this.totalPacientes      = pacientes.length;
        this.totalDentistas      = dentistas.filter(d => d.ativo).length;
        this.carregando = false;
      },
      error: () => {
        this.snackbar.erro('Erro ao carregar dados do dashboard.');
        this.carregando = false;
      }
    });
  }
}