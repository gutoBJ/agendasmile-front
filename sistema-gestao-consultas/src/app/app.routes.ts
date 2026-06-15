import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    //canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'pacientes',
        loadComponent: () =>
          import('./features/pacientes/pacientes.component')
            .then(m => m.PacientesComponent)
      },
      {
        path: 'dentistas',
        loadComponent: () =>
          import('./features/dentistas/dentistas.component')
            .then(m => m.DentistasComponent)
      },
      {
        path: 'especialidades',
        loadComponent: () =>
          import('./features/especialidades/especialidades.component')
            .then(m => m.EspecialidadesComponent)
      },
      {
        path: 'consultas',
        loadComponent: () =>
          import('./features/consultas/consultas.component')
            .then(m => m.ConsultasComponent)
      },
      {
        path: 'usuarios',
        // canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
];