import { endereco } from "./endereco";
import { IPessoa, Pessoa } from "./pessoa";

export interface IAluno extends IPessoa {
    // cpf?: string;
    // dataNascimento?: Date;
    // endereco?: endereco;
    // nome?: string;
    numeroMatricula?: string;
}
//serializar
export class Aluno extends Pessoa implements IAluno {

    numeroMatricula?: string;
    // object.assign
    constructor(data: any) {
        super(data);
        this.numeroMatricula = data.numeroMatricula;
    }
}