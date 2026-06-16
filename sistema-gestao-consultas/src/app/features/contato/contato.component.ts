import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NavbarComponent,
    FooterComponent,
    MatIcon,
    MatCard,
    MatCardContent
],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent {
  form: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome:      ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      mensagem:  ['', Validators.required],
    });
  }

  enviar() {
    if (this.form.invalid) return;
    // Por enquanto só exibe mensagem de sucesso
    this.enviado = true;
    this.form.reset();
  }
}