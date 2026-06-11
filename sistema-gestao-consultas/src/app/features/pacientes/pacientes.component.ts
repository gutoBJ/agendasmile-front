import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PacienteService, Paciente } from '../../core/services/paciente.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  colunas = ['nome', 'email', 'cpf', 'telefone', 'acoes'];
  carregando = false;
  erro = '';

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregarPacientes();
  }

  carregarPacientes() {
    this.carregando = true;
    this.pacienteService.listar().subscribe({
      next: (dados) => {
        this.pacientes = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar pacientes.';
        this.carregando = false;
      }
    });
  }

  editar(paciente: Paciente) {
    // Vamos implementar depois com o formulário
  }

  deletar(id: number) {
    // Vamos implementar depois com o confirm-dialog
  }
}