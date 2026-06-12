import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ConsultaService, Consulta } from '../../../core/services/consulta.service';
import { PacienteService, Paciente } from '../../../core/services/paciente.service';
import { DentistaService, Dentista } from '../../../core/services/dentista.service';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './consulta-form.component.html',
  styleUrl: './consulta-form.component.scss'
})
export class ConsultaFormComponent implements OnInit {
  form: FormGroup;
  carregando = false;
  editando: boolean;
  pacientes: Paciente[] = [];
  dentistas: Dentista[] = [];
  erro = '';

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private pacienteService: PacienteService,
    private dentistaService: DentistaService,
    private dialogRef: MatDialogRef<ConsultaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta | null
  ) {
    this.editando = !!data;

    this.form = this.fb.group({
      idPaciente:  [data?.idPaciente  || '', Validators.required],
      idDentista:  [data?.idDentista  || '', Validators.required],
      descricao:   [data?.descricao   || '', Validators.required],
      dataInicio:  [data?.dataInicio  || '', Validators.required],
      dataFim:     [data?.dataFim     || '', Validators.required],
    }, { validators: this.validarDatas });
  }

  ngOnInit() {
    this.pacienteService.listar().subscribe(p => this.pacientes = p);
    this.dentistaService.listar().subscribe(d => this.dentistas = d.filter(d => d.ativo));
  }

  // Valida que dataFim é depois de dataInicio
  validarDatas(form: FormGroup) {
    const inicio = form.get('dataInicio')?.value;
    const fim = form.get('dataFim')?.value;

    if (inicio && fim && new Date(fim) <= new Date(inicio)) {
      form.get('dataFim')?.setErrors({ dataInvalida: true });
    }

    return null;
  }

  salvar() {
    if (this.form.invalid) return;

    // Valida que a data não é no passado
    const dataInicio = new Date(this.form.value.dataInicio);
    if (dataInicio < new Date()) {
      this.erro = 'Não é permitido agendar consultas em datas passadas.';
      return;
    }

    this.carregando = true;
    const consulta = this.form.value;

    const operacao = this.editando
      ? this.consultaService.atualizar(this.data!.id!, consulta)
      : this.consultaService.criar(consulta);

    operacao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.erro = err?.error?.mensagem || 'Erro ao salvar consulta.';
        this.carregando = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}