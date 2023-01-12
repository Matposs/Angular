import { IEndereco } from "./endereco";
import { IPessoa, Pessoa } from "./pessoa";

export interface IAluno extends IPessoa {
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