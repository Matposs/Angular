import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  SERVER_URL = 'http://10.250.250.108:8084/estagiario/api/aluno/'

  constructor(
    private readonly http: HttpClient
  ) { }



}
