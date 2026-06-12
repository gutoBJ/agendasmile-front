import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DentistaService, Dentista } from '../../core/services/dentista.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DentistaFormComponent } from './dentista-form/dentista-form.component';

@Component({
  selector: 'app-dentistas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatChipsModule,
  ],
  templateUrl: './dentistas.component.html',
  styleUrl: './dentistas.component.scss'
})
export class DentistasComponent implements OnInit {
  dentistas: Dentista[] = [];
  colunas = ['nome', 'email', 'cpf', 'cro', 'ativo', 'acoes'];
  carregando = false;
  erro = '';

  constructor(
    private dentistaService: DentistaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carregarDentistas();
  }

  carregarDentistas() {
    this.carregando = true;
    this.dentistaService.listar().subscribe({
      next: (dados) => {
        this.dentistas = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar dentistas.';
        this.carregando = false;
      }
    });
  }

  novo() {
    const ref = this.dialog.open(DentistaFormComponent, {
      data: null
    });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarDentistas();
    });
  }

  editar(dentista: Dentista) {
    const ref = this.dialog.open(DentistaFormComponent, {
      data: dentista
    });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarDentistas();
    });
  }

  desativar(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Desativar Dentista',
        mensagem: 'Tem certeza que deseja desativar este dentista?'
      } as ConfirmDialogData
    });

    ref.afterClosed().subscribe(confirmou => {
      if (confirmou) {
        this.dentistaService.desativar(id).subscribe({
          next: () => this.carregarDentistas(),
          error: () => this.erro = 'Erro ao desativar dentista.'
        });
      }
    });
  }
}