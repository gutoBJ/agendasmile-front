import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PacienteService, Paciente } from '../../../core/services/paciente.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.scss'
})
export class PacienteFormComponent {
  form: FormGroup;
  carregando = false;
  editando: boolean;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private dialogRef: MatDialogRef<PacienteFormComponent>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Paciente | null
  ) {
    this.editando = !!data;

    this.form = this.fb.group({
      nome: [data?.nome || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      cpf: [data?.cpf || '', Validators.required],
      telefone: [data?.telefone || '', Validators.required],
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.carregando = true;
    const paciente = this.form.value;

    const operacao = this.editando
      ? this.pacienteService.atualizar(this.data!.id!, paciente)
      : this.pacienteService.criar(paciente);

    operacao.subscribe({
      next: () => {
        this.snackbar.sucesso(this.editando ? 'Paciente atualizado!' : 'Paciente cadastrado!');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbar.erro('Erro ao salvar paciente.');
        this.carregando = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}