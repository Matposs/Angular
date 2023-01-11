import { IEndereco } from "./endereco";

export interface IPessoa {
    idade?: number;
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: IEndereco;
}

export class Pessoa implements IPessoa {
    idade?: number;
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: IEndereco;
    constructor(data: any) {
        this.dataNascimento = data.dataNascimento ? new Date(data.dataNascimento) : undefined;
        this.idade = this.dataNascimento ? (new Date().getUTCFullYear() - this.dataNascimento.getUTCFullYear()) : undefined;
        this.nome = data.nome;
        this.cpf = data.cpf;
        this.endereco = data.endereco;
    }
}