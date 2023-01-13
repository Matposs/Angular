import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { catchError, map, Observable, retry } from 'rxjs';
import { Aluno } from '../models/aluno';
import { IPessoa, Pessoa } from '../models/pessoa';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  SERVER_URL = 'http://10.250.250.108:8084/estagiario/api/pessoa/'

  constructor(private readonly http: HttpClient) {

  }

  public getPessoas(): Observable<Pessoa[]> {
    return this.http.get<any[]>(this.SERVER_URL + 'obterLista')
      .pipe(map(v => v ?
        v.map(r =>
          r.especialidade ? new Professor(r) : new Aluno(r)
        ) : []))
  }

  public getPorCpf(cpf: string): Observable<Pessoa> {
    return this.http.get<any>(this.SERVER_URL + 'obterPorCpf?cpf=' + cpf)
      .pipe(map(v => v ?
        v.map(r =>
          r.this.cpf.equals(cpf) ? Pessoa : undefined) : []
      ))
  }

  public deletarPessoa(pessoa: IPessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.SERVER_URL + 'excluir', pessoa)
  }


}
