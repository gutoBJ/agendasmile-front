import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { ConsultaService, Consulta } from '../../core/services/consulta.service';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';
import { ConsultaCancelamentoComponent } from './consulta-cancelamento/consulta-cancelamento.component';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatDialogModule, MatChipsModule,
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  colunas = ['paciente', 'dentista', 'dataInicio', 'dataFim', 'status', 'acoes'];
  carregando = false;

  constructor(
    private consultaService: ConsultaService,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.carregarConsultas();
  }

  carregarConsultas() {
    this.carregando = true;
    this.consultaService.listar().subscribe({
      next: (dados) => {
        this.consultas = dados;
        this.carregando = false;
      },
      error: () => {
        this.snackbar.erro('Erro ao carregar consultas.');
        this.carregando = false;
      }
    });
  }

  novo() {
    const ref = this.dialog.open(ConsultaFormComponent, { data: null });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarConsultas();
    });
  }

  editar(consulta: Consulta) {
    const ref = this.dialog.open(ConsultaFormComponent, { data: consulta });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarConsultas();
    });
  }

  cancelar(id: number) {
    const ref = this.dialog.open(ConsultaCancelamentoComponent, { data: id });
    ref.afterClosed().subscribe(cancelou => {
      if (cancelou) {
        this.snackbar.sucesso('Consulta cancelada com sucesso!');
        this.carregarConsultas();
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'AGENDADA':   return 'chip-agendada';
      case 'FINALIZADA': return 'chip-finalizada';
      case 'CANCELADA':  return 'chip-cancelada';
      default:           return '';
    }
  }
}