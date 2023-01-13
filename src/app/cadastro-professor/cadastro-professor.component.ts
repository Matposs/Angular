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

  pessoas: IPessoa[] = [];
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
  isProfessor: boolean = true;
  condicao: boolean = true;
  condicaoReadOnly?: boolean = false;
  private professor?: IProfessor | undefined;

  set prof(value: IProfessor | undefined) {
    this.professor = value;
    this.form.reset(this.professor);
    this.endereco.reset(this.professor?.endereco);
    this.conhecimento.reset(this.professor?.conhecimentos);
  }

  public get prof(): IProfessor | undefined {
    return this.professor;
  }

  ngOnInit() {
    this.novoCadastro();
  }

  salvar() {
    if (this.professor) {
      Object.assign(this.professor, this.form.getRawValue());
      if (this.professor.endereco) {
        Object.assign(this.professor.endereco, this.endereco.getRawValue());
      } else {
        this.professor.endereco = new Endereco(this.endereco.getRawValue());
      }
      if (this.professor.conhecimentos) {
        Object.assign(this.professor.conhecimentos, this.conhecimentos);
      } else {
        this.professor.conhecimentos = this.conhecimentos as string[];
      }
      this.professorService.setProfessor(this.professor).subscribe({
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
    this.professor = new Professor({ conhecimentos: [] });
    this.form.reset();
    this.condicao = false;
  }

  adicionarConhecimentos() {
    this.conhecimentos?.push(this.conhecimento.controls['conhecimento'].value);
    this.conhecimento.reset();
  }

  deletarConhecimento(conhecimento: String) {
    const pos = this.conhecimentos?.indexOf(conhecimento);
    if (pos && pos > -1) this.conhecimentos?.splice(pos, 1);
    this.conhecimento.reset();
  }

}
