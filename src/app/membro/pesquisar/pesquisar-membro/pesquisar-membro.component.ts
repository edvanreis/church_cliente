import { Component, OnInit } from '@angular/core';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { take } from 'rxjs/operators';
import { Membro } from '../../../model/membro';
import { MembroService } from '../../../service/membro.service';

@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService,private _membroService: MembroService) { }

  public membro: any;
  public dadosPessoais: any;
  public endereco: any;
  public comboTipoContatos = [];
  public comboEscolaridade = []

  ngOnInit() {
    // this.setEmiter();
    this.getEmiter();
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      } else if (item.type == 'endereco') {
        this.endereco = item.data;
        console.log(item.data)
      }

    });
  }
  
  buscar() {
    console.log(this.fillMembro());
  }

  fillMembro(): Membro {
    //dados pessoais
    console.log(this.dadosPessoais);
    this.membro = new Membro();
    this.membro.nome = this.dadosPessoais.nome;
    this.membro.sobreNome = this.dadosPessoais.sobreNome;
    this.membro.rg = this.dadosPessoais.rg;
    this.membro.cpf = this.dadosPessoais.cpf;
    this.membro.sexo = this.dadosPessoais.sexo;
    this.membro.estadoCivil = this.dadosPessoais.estadoCivil;
    this.membro.dataNascimento = this.dadosPessoais.dataNascimento;
    this.membro.idCelula = this.dadosPessoais.idCelula;
    this.membro.nacionalidade = this.dadosPessoais.nacionalidade;
    this.membro.profissao = this.dadosPessoais.profissao;
    this.membro.batizado = this.dadosPessoais.batizado;
    this.membro.dizimista = this.dadosPessoais.dizimista;
    //endereco
    this.membro.cep = this.endereco.cep
    this.membro.numero = this.endereco.numero
    this.membro.complemento = this.endereco.complemento
    this.membro.bairro =   this.endereco.bairro 
    this.membro.logradouro =  this.endereco.logradouro 
    this.membro.cidade =   this.endereco.cidade
    this.membro.uf = this.endereco.uf 
   


    return this.membro;
  }

}
