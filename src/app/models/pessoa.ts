import { IEndereco } from "./endereco";

export interface IPessoa {
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: IEndereco;
}

export class Pessoa implements IPessoa {
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    endereco?: IEndereco;
    constructor(data: any) {
        this.dataNascimento = data.dataNascimento ? new Date(data.dataNascimento) : undefined;
        this.nome = data.nome;
        this.cpf = data.cpf;
        this.endereco = data.endereco;
    }
}