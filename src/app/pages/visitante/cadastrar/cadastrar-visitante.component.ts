import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
import { ContatoService } from '../../../service/contato.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { EscolaridadeService } from '../../../service/escolaridade.service';
import { PessoaService } from '../../../service/pessoa.service';

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
  public pessoa = {} as any;
  public id:any;
  public pesquisa:boolean=false;



  constructor( private _emitirEventoService: EmitirEventoService,
    private _service:PessoaService,
    private _enderecoService:EnderecoService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _contatoService:ContatoService,
    private _escolaridadeService:EscolaridadeService) { }

  ngOnInit() {
    this.getParams();
    this.getEmiter();
  }

  getParams(){
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPessoa(this.id);
      this.pesquisa = true;
    }
  }

  getPessoa(id) {
    this._service.obterPessoa(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.emitirPessoa(item);
      this.getEndereco(item.id)
      this.getContatos(item.id);
      this.getEscolaridades(item.id);
      this.emitirIgreja(item.igreja);
    }, error => {
      // console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getEndereco(id) {
    // console.log(id)
    this._enderecoService.obterEndereco(id).pipe(take(1)).subscribe(item => {
      this.emitirEnderecos(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getContatos(id) {
    // console.log(id)
    this._contatoService.obterContatoPessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirContatos(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getEscolaridades(id) {
    // console.log(id)
    this._escolaridadeService.obterEscolaridadePessoa(id).pipe(take(1)).subscribe(item => {
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
      if (item.type == 'igreja-comp') {
        this.igreja = item.data;
      }

    });
  }

  salvar(){
    this.setObj();
    console.log(this.pessoa)
    if(!this.pessoa.nome){
      this._notifierService.notify(AlertType.Error,"Por favor digite o nome do visitante!");
      return false;
    }
    if(!this.pessoa.id){
      this.save();
    }else{
      this.updade();
    }
  }

  save(){
    // console.log(this.pessoa)
    this._service.save(this.pessoa).pipe(take(1)).subscribe(item => {
      this.emitiClear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  updade(){
    // console.log(this.pessoa)
    this._service.update(this.pessoa).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  setObj(){
    this.getEmiter();
    if(this.dadosPessoais){
      this.pessoa.id = this.id;
      this.pessoa.nome = this.dadosPessoais.nome;
      this.pessoa.sobreNome = this.dadosPessoais.sobreNome;
      this.pessoa.rg = this.dadosPessoais.rg;
      this.pessoa.cpf = this.dadosPessoais.cpf;
      this.pessoa.sexo = this.dadosPessoais.sexo;
      this.pessoa.estadoCivil = this.dadosPessoais.estadoCivil;
      this.pessoa.dataNascimento = this.dadosPessoais.dataNascimento;
      this.pessoa.nacionalidade = this.dadosPessoais.nacionalidade;
      this.pessoa.profissao = this.dadosPessoais.profissao;
      this.pessoa.observacao = this.dadosPessoais.observacao;
      this.pessoa.visitante = true;
      this.pessoa.membro = false;
    }
    if(this.enderecos){
      this.pessoa.enderecos = this.enderecos;
    }
    if(this.contatos){
      this.pessoa.contatos = this.contatos;
    }
    if(this.escolaridades){
      this.pessoa.escolaridades = this.escolaridades;
    }
    if(this.celula){
      this.pessoa.celula = {id:this.celula.id};
    }

    if(this.igreja){
      this.pessoa.igreja = {id:this.igreja.id};
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

  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
  }



  voltar(){
    this._router.navigate(['/auth/visitante/pesquisar'], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }


}
