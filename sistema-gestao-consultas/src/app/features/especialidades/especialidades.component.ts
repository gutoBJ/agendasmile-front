import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialidadeService, Especialidade } from '../../core/services/especialidade.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent implements OnInit {
  especialidades: Especialidade[] = [];
  colunas = ['nome', 'acoes'];
  carregando = false;
  form: FormGroup;

  constructor(
    private especialidadeService: EspecialidadeService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.carregarEspecialidades();
  }

  carregarEspecialidades() {
    this.carregando = true;
    this.especialidadeService.listar().subscribe({
      next: (dados) => {
        this.especialidades = dados;
        this.carregando = false;
      },
      error: () => {
        this.snackbar.erro('Erro ao carregar especialidades.');
        this.carregando = false;
      }
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.especialidadeService.criar(this.form.value).subscribe({
      next: () => {
        this.snackbar.sucesso('Especialidade cadastrada com sucesso!');
        this.form.reset();
        this.carregarEspecialidades();
      },
      error: () => this.snackbar.erro('Erro ao salvar especialidade.')
    });
  }

  deletar(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Excluir Especialidade',
        mensagem: 'Tem certeza que deseja excluir esta especialidade?'
      } as ConfirmDialogData
    });

    ref.afterClosed().subscribe(confirmou => {
      if (confirmou) {
        this.especialidadeService.deletar(id).subscribe({
          next: () => {
            this.snackbar.sucesso('Especialidade excluída com sucesso!');
            this.carregarEspecialidades();
          },
          error: () => this.snackbar.erro('Erro ao excluir especialidade.')
        });
      }
    });
  }
}