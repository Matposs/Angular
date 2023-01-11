import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno, IAluno } from '../models/aluno';
import { Endereco, IEndereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
import { PessoasService } from '../services/pessoas.service';
import { AlunoService } from '../services/aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})


export class CadastroAlunoComponent {

  alunos: IAluno[] = [];
  enderecos: Endereco[] = [];
  form: FormGroup = this.fb.group<any>({
    nome: [, [Validators.required]],
    dataNascimento: [, [Validators.required]],
    cpf: [, [Validators.required]],
    numeroMatricula: [, [Validators.required]],
    endereco: {
      uf: [, [Validators.required]],
      logradouro: [, [Validators.required]],
      numero: [, [Validators.required]],
      municipio: [, [Validators.required]],
    }
  });

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private alunoService: AlunoService, private _snackBar: MatSnackBar, private router: Router,
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
      this.alunoService.setAluno(pessoa).subscribe({
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

}
