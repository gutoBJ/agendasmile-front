import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    title: 'AgendaSmile - Home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'sobre',
    title: 'AgendaSmile - Sobre',
    loadComponent: () =>
      import('./features/sobre/sobre.component')
        .then(m => m.SobreComponent)
  },
  {
    path: 'contato',
    title: 'AgendaSmile - Contato',
    loadComponent: () =>
      import('./features/contato/contato.component')
        .then(m => m.ContatoComponent)
  },
  {
    path: 'login',
    title: 'AgendaSmile - Login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'AgendaSmile - Dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'pacientes',
        title: 'AgendaSmile - Pacientes',
        loadComponent: () =>
          import('./features/pacientes/pacientes.component')
            .then(m => m.PacientesComponent)
      },
      {
        path: 'dentistas',
        title: 'AgendaSmile - Dentistas',
        loadComponent: () =>
          import('./features/dentistas/dentistas.component')
            .then(m => m.DentistasComponent)
      },
      {
        path: 'especialidades',
        title: 'AgendaSmile - Especialidades',
        loadComponent: () =>
          import('./features/especialidades/especialidades.component')
            .then(m => m.EspecialidadesComponent)
      },
      {
        path: 'consultas',
        title: 'AgendaSmile - Consultas',
        loadComponent: () =>
          import('./features/consultas/consultas.component')
            .then(m => m.ConsultasComponent)
      },
      {
        path: 'usuarios',
        title: 'AgendaSmile - Usuários',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent)
      },
      {
        path: 'relatorios',
        title: 'AgendaSmile - Relatórios',
        loadComponent: () =>
          import('./features/relatorios/relatorios.component')
            .then(m => m.RelatoriosComponent)
      },
    ]
  },

  { path: '**', redirectTo: 'home' }
];