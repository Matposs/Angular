import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { catchError, Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  SERVER_URL = 'http://10.250.250.108:8084/estagiario/api/aluno/'

  constructor(
    private readonly http: HttpClient
  ) { }

  public setAluno(aluno: Aluno): Observable<Aluno> {

    return this.http.post<Aluno>(this.SERVER_URL + 'manter', aluno)

  }

  public alterarAluno(aluno: Aluno) {
    return this.http.post<Aluno>(this.SERVER_URL + 'alterar', aluno)
  }
}

