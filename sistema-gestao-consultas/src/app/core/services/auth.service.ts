import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  perfil: string;
  nome: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, senha: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, {
      email,
      senha
    });
  }

  salvarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<TokenPayload>(token);
  }

  getPerfil(): string | null {
    return this.getPayload()?.perfil ?? null;
  }

  getNome(): string | null {
    return this.getPayload()?.nome ?? null;
  }

  isAdmin(): boolean {
    return this.getPerfil() === 'ADMIN';
  }

  isLogado(): boolean {
    const payload = this.getPayload();
    if (!payload) return false;

    // Verifica se o token não expirou
    const agora = Math.floor(Date.now() / 1000);
    return payload.exp > agora;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}