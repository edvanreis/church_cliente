import { Endereco } from "./Endereco";

export class Pessoa  {
    public id:number;
    public nome:string;
    public sobreNome:string;
    public sexo:string;
    public rg:string;
    public cpf:string;
    public dataNascimento:any;
    public nacionalidade:string;
    public escolaridades=[];
    public estadoCivil:string;
    public contatos=[];
    public observacao:string;
    public profissao:string;
    public endereco:Endereco = new Endereco();
}