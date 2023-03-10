import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Aluno, IAluno } from '../models/aluno';
import { Endereco, IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { IProfessor, Professor } from '../models/professor.model';
import { AlunoService } from '../services/aluno.service';
import { PessoasService } from '../services/pessoas.service';
import { ProfessorService } from '../services/professor.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})


export class CadastroPessoaComponent implements OnInit {

  pessoas: IPessoa[] = [];
  conhecimentos?: String[];
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

  conhecimento: FormGroup = this.fb.group<any>({
    conhecimento: []
  });

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private alunoService: AlunoService, private professorService: ProfessorService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.getPessoas();
  }
  isProfessor: boolean = true;
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private _pessoaAtual?: IPessoa | undefined;
  public professor?: IProfessor | undefined;
  private aluno?: Aluno | undefined;
  public get pessoaAtual(): IPessoa | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IPessoa | undefined) {
    this._pessoaAtual = value;
    this.form.reset(this._pessoaAtual);
    this.endereco.reset(this._pessoaAtual?.endereco);
    this.conhecimento.reset(this.professor?.conhecimentos);
    this.isProfessor = value instanceof Professor;
    this.condicaoReadOnly = true;
    if (this.isProfessor) {
      this.professor = this._pessoaAtual;
    } else {
      this.aluno = this._pessoaAtual;
    }
  }
  condicaoRead() {
    return false;
  }

  load() {
    (sessionStorage['refresh'] == 'true' || !sessionStorage['refresh']) && location.reload();
    sessionStorage['refresh'] = false;
  }

  salvar() {
    this.aluno = this.pessoaAtual;
    this.professor = this._pessoaAtual;
    if (this.form.invalid) return;

    if (this.pessoaAtual && this.isProfessor == true && this.professor?.endereco && this.professor?.conhecimentos) {
      if (this.professor) {
        Object.assign(this.professor, this.form.getRawValue());
        Object.assign(this.professor.endereco, this.endereco.getRawValue());
        Object.assign(this.professor.conhecimentos, this.conhecimento.getRawValue());
        this.editarProfessor(this.professor);
      }
    }
    if (this.pessoaAtual && this.isProfessor != true) {
      if (this.aluno && this.aluno.endereco) {
        Object.assign(this.aluno, this.form.getRawValue());
        Object.assign(this.aluno.endereco, this.endereco.getRawValue());
        this.editarAluno(this.aluno);
      }
    }
    this.endereco.reset();
    this.form.reset();
    this.pessoaAtual = undefined;

  }

  getIdade(dataNascimento) {
    const idade = dataNascimento ? (new Date().getUTCFullYear() -
      dataNascimento.getUTCFullYear()) : undefined;
    return idade;
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
  excluirPessoa(pessoa: IPessoa) {
    this.pessoasService.deletarPessoa(pessoa)
      .subscribe({
        next: () => {
          this._snackBar.open("Altera????o conclu??da com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      })
    setTimeout(() => {
      this.getPessoas()
    }, 1000);
  }

  // getPessoasPorCpf () {
  //   this.pessoasService.getPorCpf(cpf).subscribe((pessoa: IPessoa) => {
  //     this.pessoaAtual = pessoa;
  //     return pessoa;
  //   })
  // }
  editarAluno(aluno: Aluno) {
    this.alunoService.alterarAluno(aluno)
      .subscribe({
        next: () => {
          this._snackBar.open("Altera????o conclu??da com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      })
  }
  editarProfessor(professor: Professor) {
    this.professorService.alterarProfessor(professor)
      .subscribe({
        next: () => {
          this._snackBar.open("Altera????o conclu??da com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          })
        }
      })
  }
  adicionarConhecimentos() {
    this.professor?.conhecimentos?.push(this.conhecimento.controls['conhecimento'].value);
    this.conhecimento.reset();
  }

  deletarConhecimento(conhecimento: string) {
    const pos = this.professor?.conhecimentos?.indexOf(conhecimento);
    if (pos && pos > -1) this.professor?.conhecimentos?.splice(pos, 1);
    this.conhecimento.reset();
  }
}
