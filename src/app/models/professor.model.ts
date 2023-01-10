import { IEndereco } from "./endereco";
import { IPessoa, Pessoa } from "./pessoa";

export interface IProfessor extends IPessoa {

    // nome? : string;
    // cpf? : string;
    // dataNascimento? : Date;
    // endereco? : endereco;
    especialidade?: string;
    conhecimentos?: string[];
}

export class Professor extends Pessoa implements IProfessor {
    especialidade?: string;
    conhecimentos?: string[];

    constructor(data: any) {
        super(data);
        this.especialidade = data.especialidade;
        this.conhecimentos = data.conhecimentos;
    }

}