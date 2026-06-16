import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { UsuarioService, Usuario } from '../../core/services/usuario.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatDialogModule, MatChipsModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  colunas = ['nome', 'email', 'cpf', 'perfil', 'ativo', 'acoes'];
  carregando = false;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.carregando = false;
      },
      error: () => {
        this.snackbar.erro('Erro ao carregar usuários.');
        this.carregando = false;
      }
    });
  }

  novo() {
    const ref = this.dialog.open(UsuarioFormComponent, { data: null });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarUsuarios();
    });
  }

  editar(usuario: Usuario) {
    const ref = this.dialog.open(UsuarioFormComponent, { data: usuario });
    ref.afterClosed().subscribe(salvou => {
      if (salvou) this.carregarUsuarios();
    });
  }

  desativar(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Desativar Usuário',
        mensagem: 'Tem certeza que deseja desativar este usuário?'
      } as ConfirmDialogData
    });

    ref.afterClosed().subscribe(confirmou => {
      if (confirmou) {
        this.usuarioService.desativar(id).subscribe({
          next: () => {
            this.snackbar.sucesso('Usuário desativado com sucesso!');
            this.carregarUsuarios();
          },
          error: () => this.snackbar.erro('Erro ao desativar usuário.')
        });
      }
    });
  }
}