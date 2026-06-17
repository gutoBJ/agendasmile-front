import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface BoasVindasData {
  nome: string;
  perfil: string;
}

@Component({
  selector: 'app-boas-vindas-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './boas-vindas-dialog.component.html',
  styleUrl: './boas-vindas-dialog.component.scss'
})
export class BoasVindasDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BoasVindasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoasVindasData
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}