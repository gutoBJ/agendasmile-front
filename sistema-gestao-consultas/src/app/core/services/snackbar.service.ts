import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  sucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-sucesso'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  erro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 4000,
      panelClass: ['snackbar-erro'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}