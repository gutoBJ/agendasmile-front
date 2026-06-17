import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  mobile = false;

  ngOnInit(): void {
    this.verificarTela();
  }

  @HostListener('window:resize')
  onResize() {
    this.verificarTela();
  }

  private verificarTela() {
    this.mobile = window.innerWidth < 768;
  }
}