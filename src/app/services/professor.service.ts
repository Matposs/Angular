import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  SERVER_URL = 'http://10.250.250.108:8084/estagiario/api/professor/'

  constructor(private readonly http: HttpClient) { }

  public setProfessor(professor: Professor): Observable<Professor> {

    return this.http.post<Professor>(this.SERVER_URL + 'manter', professor)

  }

  public alterarProfessor(professor: Professor)  {
    return this.http.post <Professor>(this.SERVER_URL + 'alterar', professor)
   }


}
