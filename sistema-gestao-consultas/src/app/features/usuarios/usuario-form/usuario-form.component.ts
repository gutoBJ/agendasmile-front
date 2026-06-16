import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UsuarioService, Usuario } from '../../../core/services/usuario.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatButtonModule, MatSelectModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  form: FormGroup;
  carregando = false;
  editando: boolean;
  senhaVisivel = false;
  perfis = ['ADMIN', 'DENTISTA'];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | null
  ) {
    this.editando = !!data;

    this.form = this.fb.group({
      nome:   [data?.nome   || '', Validators.required],
      email:  [data?.email  || '', [Validators.required, Validators.email]],
      cpf:    [data?.cpf    || '', Validators.required],
      perfil: [data?.perfil || '', Validators.required],
      senha:  ['', this.editando ? [] : Validators.required],
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.carregando = true;
    const usuario = this.form.value;

    if (this.editando && !usuario.senha) {
      delete usuario.senha;
    }

    const operacao = this.editando
      ? this.usuarioService.atualizar(this.data!.id!, usuario)
      : this.usuarioService.criar(usuario);

    operacao.subscribe({
      next: () => {
        this.snackbar.sucesso(this.editando ? 'Usuário atualizado!' : 'Usuário cadastrado!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackbar.erro(err?.error?.mensagem || 'Erro ao salvar usuário.');
        this.carregando = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}