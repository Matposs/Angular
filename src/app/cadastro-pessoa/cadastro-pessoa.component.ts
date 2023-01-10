import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Aluno } from '../models/aluno';
import { IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { AlunoService } from '../services/aluno.service';
import { PessoasService } from '../services/pessoas.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})


export class CadastroPessoaComponent {

  pessoas: IPessoa[] = [];
  form: FormGroup = this.fb.group<any>({
    nomeCompleto: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    uf: [,[Validators.required]],
    logradouro: [,[Validators.required]],
    numero: [,[Validators.required]],
    municipio: [,[Validators.required]]
  });


  

    constructor(
      private readonly fb: FormBuilder, private pessoasService: PessoasService,
      private alunoService : AlunoService
    ) {
    }
  condicao: boolean = true;
  condicaoReadOnly? : boolean = false;
  private _pessoaAtual?: IPessoa | undefined;
  public get pessoaAtual(): IPessoa | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IPessoa | undefined) {
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
      this.pessoas.push(pessoa)
//ENDERECO DAR ASSIGN NO FORM <<
    }
    const aluno = new Aluno(undefined);
    this.alunoService.setAluno(aluno).subscribe({
      next: (aluno) => {
        return aluno;
      }});
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
    this.pessoasService.getPessoas().subscribe((pessoas: IPessoa[]) => {
      this.pessoas = pessoas;
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
