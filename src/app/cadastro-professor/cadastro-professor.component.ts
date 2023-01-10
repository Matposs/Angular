import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { IProfessor } from '../models/professor.model';
import { PessoasService } from '../services/pessoas.service';
import { ProfessorService } from '../services/professor.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})


export class CadastroProfessorComponent {

  professores: IProfessor[] = [];
  form: FormGroup = this.fb.group<any>({
    nomeCompleto: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    uf: [, [Validators.required]],
    logradouro: [, [Validators.required]],
    numero: [, [Validators.required]],
    municipio: [, [Validators.required]],
    especialidade: [, [Validators.required]]
  });
  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    professorService: ProfessorService
  ) {
  }
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private _pessoaAtual?: IProfessor | undefined;
  public get pessoaAtual(): IProfessor | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IProfessor | undefined) {
    this._pessoaAtual = value;
    this.form.reset(this._pessoaAtual);
    this.condicaoReadOnly = true;
  }
  condicaoRead() {
    return false;
  }
  getIdade() {
    const dataHoje = new Date;
    const data = new Date(this.form.controls['dataNascimento'].value);
    const idade = dataHoje.getFullYear() - data.getFullYear();
    return idade;
  }

  salvar() {
    if (this.form.invalid) return;

    if (this.pessoaAtual) {
      Object.assign(this.pessoaAtual, this.form.getRawValue())
    } else {
      const pessoa = this.form.getRawValue();
      pessoa.idade = this.getIdade();
      this.professores.push(pessoa)

    }

    this.form.reset();
    this.pessoaAtual = undefined;
    this.condicao = false;

  }

  novoCadastro() {
    this.pessoaAtual = undefined;
    this.form.reset();
    this.condicao = false;
  }


  condicional() {
    if (this.condicao == true)
      return this.condicao = false;
    else
      return this.condicao = true;
  }

  getPessoas() {
    this.pessoasService.getPessoas().subscribe((pessoas: IProfessor[]) => {
      this.professores = pessoas;
      return pessoas;
    })
  }
  // getPessoasPorCpf () {
  //   this.pessoasService.getPorCpf(cpf).subscribe((pessoa: IPessoa) => {
  //     this.pessoaAtual = pessoa;
  //     return pessoa;
  //   })
  // }



}
