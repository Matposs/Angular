export interface IEndereco {
    logradouro?: string;
    municipio?: string;
    numero?: string;
    uf?: string;
}

export class Endereco implements IEndereco {
    logradouro?: string;
    municipio?: string;
    numero?: string;
    uf?: string;

    constructor(data: any) {
        this.logradouro = data.logradouro ? data.logradouro : null;
        this.municipio = data.municipio ? data.municipio : null;
        this.numero = data.numero ? data.numero : null;
        this.uf = data.uf ? data.uf : null;

    }
}