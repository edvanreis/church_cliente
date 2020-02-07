import { Component, OnInit } from '@angular/core';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { VisitanteService } from '../../../service/visitante.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { PessoaService } from '../../../service/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnderecoService } from '../../../service/endereco.service';
import { ContatoService } from '../../../service/contato.service';

@Component({
  selector: 'app-cadastrar-visitante',
  templateUrl: './cadastrar-visitante.component.html',
  styleUrls: ['./cadastrar-visitante.component.scss']
})
export class CadastrarVisitanteComponent implements OnInit {

  public dadosPessoais: any;
  public enderecos: any;
  public escolaridades:any = [];
  public contatos:any = [];
  public celula:any;
  public igreja:any;
  public visitante = {} as any;
  public id:any;


  constructor( private _emitirEventoService: EmitirEventoService,
    private _service:PessoaService, 
    private _enderecoService:EnderecoService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _contatoService:ContatoService) { }

  ngOnInit() {
    this.getEmiter();
    this.getParams();
  }

  getParams(){
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPessoa(this.id);
    }
  }

  getPessoa(id) {
    this._service.obterPessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirPessoa(item);
      this.getEndereco(item.id)
      this.getContatos(item.id);
      this.getEscolaridades(item.id);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getEndereco(id) {
    console.log(id)
    this._enderecoService.obterEndereco(id).pipe(take(1)).subscribe(item => {
      this.emitirEnderecos(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getContatos(id) {
    console.log(id)
    this._contatoService.obterContatoPessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirContatos(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getEscolaridades(id) {
    console.log(id)
    this._service.obterEscolaridadePessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirEscolaridades(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.type);
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.enderecos = item.data;
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
    if(!this.visitante.nome){
      this._notifierService.notify(AlertType.Error,"Por favor digite o nome do visitante!");
      return false;
    }
    if(!this.visitante.id){
      this.save();
    }else{
      this.updade();
    }
  }

  save(){
    this._service.save(this.visitante).pipe(take(1)).subscribe(item => {
      this.emitiClear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  updade(){
    this._service.update(this.visitante).pipe(take(1)).subscribe(item => {
      this.emitiClear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  setObj(){
    this.getEmiter();
    if(this.dadosPessoais){
      this.visitante.id = this.id;
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
    if(this.enderecos){
      this.visitante.enderecos = this.enderecos;
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

  emitiClear(): void {
    this._emitirEventoService.emitir('clear', '');
  }

  emitirPessoa(item): void {
    this._emitirEventoService.emitir('edit-dadosPessoais', item);
  }

  emitirEnderecos(item): void {
    this._emitirEventoService.emitir('edit-endereco', item);
  }

  emitirContatos(item): void {
    this._emitirEventoService.emitir('edit-contatos', item);
  }

  emitirEscolaridades(item): void {
    this._emitirEventoService.emitir('edit-escolaridades', item);
  }

  voltar(){
    this._router.navigate(['/auth/visitante/pesquisar'], {
      queryParams: {
        
      },
      skipLocationChange: true
    });
  }

}
