import { endereco } from "./endereco";

export interface IPessoa {
    idade?: number;
    nomeCompleto?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: endereco;
}

export class Pessoa implements IPessoa {
    idade?: number;
    nomeCompleto?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: endereco;
    constructor(data: any) {
        this.dataNascimento = data.dataNascimento ? new Date(data.dataNascimento) : undefined;
        this.idade = this.dataNascimento ? (new Date().getUTCFullYear() - this.dataNascimento.getUTCFullYear()) : undefined;
        this.nomeCompleto = data.nome;
        this.nome = data.nome;
        this.cpf = data.cpf;
        this.endereco = data.endereco;
    }
}