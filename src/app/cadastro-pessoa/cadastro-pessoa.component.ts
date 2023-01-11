import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Aluno } from '../models/aluno';
import { Endereco, IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { IProfessor, Professor } from '../models/professor.model';
import { AlunoService } from '../services/aluno.service';
import { PessoasService } from '../services/pessoas.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})


export class CadastroPessoaComponent implements OnInit {

  pessoas: IPessoa[] = [];
  enderecos: Endereco[] = [];
  form: FormGroup = this.fb.group<any>({
    nome: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    numeroMatricula: [],
    especialidade: []
  });

  endereco: FormGroup = this.fb.group<any>({
    uf: [, [Validators.required]],
    logradouro: [, [Validators.required]],
    numero: [, [Validators.required]],
    municipio: [, [Validators.required]]
  });

  conhecimentos: FormGroup = this.fb.group<any>({
    conhecimentos: []
  });
  private _snackBar: any;

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private alunoService: AlunoService
  ) {
  }
  ngOnInit() {
    this.getPessoas();
  }
  isProfessor: boolean = true;
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private _pessoaAtual?: IPessoa | undefined;
  private professor?: IProfessor | undefined;
  public get pessoaAtual(): IPessoa | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IPessoa | undefined) {
    this._pessoaAtual = value;
    this.form.reset(this._pessoaAtual);
    this.endereco.reset(this._pessoaAtual?.endereco);
    this.conhecimentos.reset(this.professor?.conhecimentos?.map)
    this.isProfessor = value instanceof Professor;
    this.condicaoReadOnly = true;
  }
  condicaoRead() {
    return false;
  }

  salvar() {
    if (this.form.invalid && this.endereco.invalid) return;

    if (this.pessoaAtual) {
      Object.assign(this.pessoaAtual, this.form.getRawValue());
      Object.assign(this.pessoaAtual, this.endereco.getRawValue());
    }
    if (this.isProfessor != true) {
      this.editarAluno(this._pessoaAtual);
      //enviando campos do form que nao deveriam estar sendo enviados 
      //dar um jeito de o formulario ficar invalido se o tipo for professor ou aluno
    }
    // else {
    //   const pessoa = this.form.getRawValue();
    //   const endereco = this.endereco.getRawValue();
    //   this.pessoas.push(pessoa);
    //   this.enderecos.push(endereco);
    // }

    this.endereco.reset();
    this.form.reset();
    this.pessoaAtual = undefined;
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

  editarAluno(aluno) {
    this.alunoService.alterarAluno(this.pessoaAtual!)
      .subscribe({
        next: () => {
          this._snackBar.open("Cadastro concluído com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      })
  }

}
