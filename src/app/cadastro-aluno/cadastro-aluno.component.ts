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
  });

  endereco: FormGroup = this.fb.group<any>({
    uf: [, [Validators.required]],
    logradouro: [, [Validators.required]],
    numero: [, [Validators.required]],
    municipio: [, [Validators.required]]
  });

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService,
    private alunoService: AlunoService, private _snackBar: MatSnackBar, private router: Router,
  ) {
  }
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private aluno?: IAluno | undefined;
  public get pessoaAtual(): IAluno | undefined {
    return this.aluno;
  }
  set Aluno(value: IAluno | undefined) {
    this.aluno = value;
    this.form.reset(this.aluno);
    this.condicaoReadOnly = true;
    this.endereco.reset(this.aluno?.endereco);
  }
  ngOnInit() {
    this.novoCadastro();
  }
  salvar() {
    if (this.aluno) {
      Object.assign(this.aluno, this.form.getRawValue());
      if (this.aluno.endereco) {
        Object.assign(this.aluno.endereco, this.endereco.getRawValue());
      } else {
        this.aluno.endereco = new Endereco(this.endereco.getRawValue());
      }
      this.alunoService.setAluno(this.aluno).subscribe({
        next: () => {
          this._snackBar.open("Cadastro concluído com sucesso!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        }
      })
    }
    this.router.navigate(["Cadastro"]);
  }

  novoCadastro() {
    this.aluno = new Aluno({ numeroMatricula: [] });
    this.form.reset();
    this.condicao = false;
  }

}
