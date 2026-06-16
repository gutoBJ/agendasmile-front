import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DentistaService, Dentista } from '../../../core/services/dentista.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-dentista-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dentista-form.component.html',
  styleUrl: './dentista-form.component.scss'
})
export class DentistaFormComponent {
  form: FormGroup;
  carregando = false;
  editando: boolean;

  constructor(
    private fb: FormBuilder,
    private dentistaService: DentistaService,
    private dialogRef: MatDialogRef<DentistaFormComponent>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Dentista | null
  ) {
    this.editando = !!data;

    this.form = this.fb.group({
      nome: [data?.nome || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      cpf: [data?.cpf || '', Validators.required],
      cro: [data?.cro || '', Validators.required],
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.carregando = true;
    const dentista = this.form.value;

    const operacao = this.editando
      ? this.dentistaService.atualizar(this.data!.id!, dentista)
      : this.dentistaService.criar(dentista);

    operacao.subscribe({
      next: () => {
        this.snackbar.sucesso(this.editando ? 'Dentista atualizado!' : 'Dentista cadastrado!');
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackbar.erro('Erro ao salvar dentista.');
        this.carregando = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}