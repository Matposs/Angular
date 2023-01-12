import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Endereco, IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { IProfessor, Professor } from '../models/professor.model';
import { PessoasService } from '../services/pessoas.service';
import { ProfessorService } from '../services/professor.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})


export class CadastroProfessorComponent {

  professores: IProfessor[] = [];
  enderecos: Endereco[] = [];
  conhecimentos: String[] = [];
  form: FormGroup = this.fb.group<any>({
    nome: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    especialidade: [, [Validators.required]],
  });

  endereco: FormGroup = this.fb.group<any>({
    uf: [, [Validators.required]],
    logradouro: [, [Validators.required]],
    numero: [, [Validators.required]],
    municipio: [, [Validators.required]]
  });

  conhecimento: FormGroup = this.fb.group<any>({
    conhecimento: []
  });

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private professorService: ProfessorService, private _snackBar: MatSnackBar, private router: Router,
  ) {
  }
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private _pessoaAtual?: IProfessor | undefined;
  private professor?: IProfessor | undefined;
  public get pessoaAtual(): IProfessor | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IProfessor | undefined) {
    this._pessoaAtual = value;
    this.form.reset(this._pessoaAtual);
    this.endereco.reset(this._pessoaAtual?.endereco);
    this.conhecimento.reset(this.professor?.conhecimentos);
    this.condicaoReadOnly = true;
  }
  salvar() {

    if (this.pessoaAtual) {
      Object.assign(this.pessoaAtual, this.form.getRawValue())
      this._snackBar.open("Cadastro concluído com sucesso!", "Ok!", {
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    }
    else {
      const pessoa = this.form.getRawValue();
      this.professores.push(pessoa);
      this.professorService.setProfessor(pessoa).subscribe({
        next: () => {
          this._snackBar.open("Cadastro concluído com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",

          });
        }
      })
    }
    this.form.reset();
    this.pessoaAtual = undefined;
    this.condicao = false;
    this.router.navigate(["Cadastro"]);
  }

  novoCadastro() {
    this.pessoaAtual = undefined;
    this.form.reset();
    this.condicao = false;
  }

  adicionarConhecimentos() {
    this.conhecimentos.push(this.conhecimento.controls['conhecimento'].value);
    this.conhecimento.reset();
  }

  deletarConhecimento(conhecimento: String) {
    const pos = this.conhecimentos.indexOf(conhecimento);
    if (pos > -1) this.conhecimentos.splice(pos, 1);
    this.conhecimento.reset();
  }

}
