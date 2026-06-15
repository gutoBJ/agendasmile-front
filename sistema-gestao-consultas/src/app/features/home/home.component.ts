import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}