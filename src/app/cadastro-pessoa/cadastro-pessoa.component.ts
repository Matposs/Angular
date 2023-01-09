import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { endereco } from '../models/endereco';
import { IPessoa } from '../models/pessoa';
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
    endereco: [, [Validators.required]]
  });

  condicao: boolean = true;

  constructor(
    private readonly fb: FormBuilder, private pessoasService: PessoasService
  ) {
  }
  private _pessoaAtual?: IPessoa | undefined;
  public get pessoaAtual(): IPessoa | undefined {
    return this._pessoaAtual;
  }
  set pessoaAtual(value: IPessoa | undefined) {
    this._pessoaAtual = value;
    this.form.reset(this._pessoaAtual);
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

    }

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

  

}
