import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent {}