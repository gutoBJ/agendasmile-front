import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalConsultas = 0;
  consultasAgendadas = 0;
  consultasCanceladas = 0;
  totalPacientes = 0;
  totalDentistas = 0;

  ngOnInit() {
    this.totalConsultas = 0;
    this.consultasAgendadas = 0;
    this.consultasCanceladas = 0;
    this.totalPacientes = 0;
    this.totalDentistas = 0;
  }
}