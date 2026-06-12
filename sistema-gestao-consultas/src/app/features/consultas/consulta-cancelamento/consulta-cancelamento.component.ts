import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../../core/services/consulta.service';

@Component({
  selector: 'app-consulta-cancelamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './consulta-cancelamento.component.html',
  styleUrl: './consulta-cancelamento.component.scss'
})
export class ConsultaCancelamentoComponent {
  form: FormGroup;
  carregando = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private dialogRef: MatDialogRef<ConsultaCancelamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public idConsulta: number
  ) {
    this.form = this.fb.group({
      motivoCancelamento: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  confirmar() {
    if (this.form.invalid) return;

    this.carregando = true;

    this.consultaService.cancelar(this.idConsulta, this.form.value).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.erro = err?.error?.mensagem || 'Erro ao cancelar consulta.';
        this.carregando = false;
      }
    });
  }

  fechar() {
    this.dialogRef.close(false);
  }
}