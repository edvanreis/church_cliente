import { Component, OnInit } from '@angular/core';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-cadastrar-visitante',
  templateUrl: './cadastrar-visitante.component.html',
  styleUrls: ['./cadastrar-visitante.component.scss']
})
export class CadastrarVisitanteComponent implements OnInit {

  public dadosPessoais: any;
  public endereco: any;
  public escolaridades:any = [];
  public contatos:any = [];
  public visitante = {} as any;


  constructor( private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.getEmiter();
  }

  

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.type);
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
      if (item.type == 'escolaridades') {
        this.escolaridades = item.data;
      }
      if (item.type == 'contatos') {
        this.contatos = item.data;
      }

    });
  }

  salvar(){
    this.setObj();
    console.log(this.visitante)
  
  }

  setObj(){
    this.getEmiter();
    if(this.dadosPessoais){
      this.visitante.nome = this.dadosPessoais.nome;
      this.visitante.sobreNome = this.dadosPessoais.sobreNome;
      this.visitante.rg = this.dadosPessoais.rg;
      this.visitante.cpf = this.dadosPessoais.cpf;
      this.visitante.sexo = this.dadosPessoais.sexo;
      this.visitante.estadoCivil = this.dadosPessoais.estadoCivil;
      this.visitante.dataNascimento = this.dadosPessoais.dataNascimento;
      this.visitante.nacionalidade = this.dadosPessoais.nacionalidade;
      this.visitante.profissao = this.dadosPessoais.profissao;
    }
    if(this.endereco){
      this.visitante.endereco = {} as any;
      this.visitante.endereco.cep = this.endereco.cep;
      this.visitante.endereco.numero = this.endereco.numero;
      this.visitante.endereco.complemento = this.endereco.complemento;
      this.visitante.endereco.bairro = this.endereco.bairro;
      this.visitante.endereco.logradouro = this.endereco.logradouro;
      this.visitante.endereco.uf = this.endereco.uf;
      this.visitante.endereco.localidade = this.endereco.cidade;
    }
    if(this.contatos){
      this.visitante.contatos = this.contatos;
    }
    if(this.escolaridades){
      this.visitante.escolaridades = this.escolaridades;
    } 
    

  }

}
