import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BoasVindasDialogComponent } from '../../../shared/components/boas-vindas-dialog/boas-vindas-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  carregando = false;
  erro = '';
  senhaVisivel = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  entrar() {
    if (this.form.invalid) return;

    this.carregando = true;
    this.erro = '';

    const { email, senha } = this.form.value;

    this.auth.login(email, senha).subscribe({
      next: (res) => {
        this.auth.salvarToken(res.token);

        const nome = this.auth.getNome() ?? '';
        const perfil = this.auth.getPerfil() ?? '';

        this.dialog.open(BoasVindasDialogComponent, {
          data: { nome, perfil },
          width: '400px',
          disableClose: true
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: () => {
        this.erro = 'E-mail ou senha inválidos.';
        this.carregando = false;
      }
    });
  }
}