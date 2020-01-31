import { Component, OnInit } from '@angular/core';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { VisitanteService } from '../../../service/visitante.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';

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
  public celula:any;
  public igreja:any;
  public visitante = {} as any;


  constructor( private _emitirEventoService: EmitirEventoService,
    private _visitanteService:VisitanteService, 
    private _notifierService: NotifierService) { }

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
      if (item.type == 'celula-comp') {
        this.contatos = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.contatos = item.data;
      }

    });
  }

  salvar(){
    this.setObj();
    // console.log(this.visitante)
    this._visitanteService.save(this.visitante).pipe(take(1)).subscribe(item => {
      this.setEmiter();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);

    });
  
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
      let enderecos:any = [];
      let endereco = {} as any
      endereco.cep = this.endereco.cep;
      endereco.numero = this.endereco.numero;
      endereco.complemento = this.endereco.complemento;
      endereco.bairro = this.endereco.bairro;
      endereco.logradouro = this.endereco.logradouro;
      endereco.uf = this.endereco.uf;
      endereco.localidade = this.endereco.cidade;
      enderecos.push(endereco);
      this.visitante.enderecos = enderecos;
    }
    if(this.contatos){
      this.visitante.contatos = this.contatos;
    }
    if(this.escolaridades){
      this.visitante.escolaridades = this.escolaridades;
    } 
    if(this.celula){
      this.visitante.celula = this.celula;
    } 

    if(this.igreja){
      this.visitante.igreja = this.celula;
    } 
    

  }

  setEmiter(): void {
    this._emitirEventoService.emitir("save-ok", "");
  }

}
