import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno, IAluno } from '../models/aluno';
import { IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { PessoasService } from '../services/pessoas.service';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})


export class CadastroAlunoComponent {

  alunos: IAluno[] = [];
  form: FormGroup = this.fb.group<any>({
    nomeCompleto: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    uf: [, [Validators.required]],
    logradouro: [, [Validators.required]],
    numero: [, [Validators.required]],
    municipio: [, [Validators.required]],
    matricula: [,[Validators.required]]
  });




  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private alunoService: AlunoService
  ) {
  }
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private _pessoaAtual?: IAluno | undefined;
  public get pessoaAtual(): IAluno | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IAluno | undefined) {
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
      this.alunos.push(pessoa);
      this.alunoService.setAluno(pessoa).subscribe({
        next: (aluno) => {
          return aluno;
        }
      })
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

  getAlunos() {
    this.pessoasService.getPessoas().subscribe((pessoas: IAluno[]) => {
      this.alunos = pessoas;
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
