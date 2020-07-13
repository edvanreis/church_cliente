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
import { MatDialog } from '@angular/material';
import { DialogConfirmCriarVisitanteComponent } from '../../dialog/dialog-confirm-criar-visitante/dialog-confirm-criar-visitante.component';

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
    private _escolaridadeService:EscolaridadeService,
    private _dialog: MatDialog) { }

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
      if (item.type == 'confirm-dialog-criar-visitante') {
        this.emitiClear();
      }
      // if (item.type == 'igreja-comp') {
      //   this.igreja = item.data;
      // }

    });
  }

  salvar(){
    this.setObj();
    let mensagem = this.validFields();
    if (mensagem) {
      this._notifierService.notify(AlertType.Error, mensagem);
      return false;
    }
    if(!this.pessoa.id){
      this.dialogAvisoVisitanteJaCadastrado(this.pessoa);
    }else{
      this.updade();
    }
  }


  updade(){
    console.log(this.pessoa)
    this._service.update(this.pessoa).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  setObj(){
    this.getEmiter();
    if(this.dadosPessoais){
      this.pessoa = this.dadosPessoais;
      this.pessoa.id = this.id;
      this.pessoa.membro = false;
      this.pessoa.visitante = true;
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
    // console.log(this.pessoa)

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

  validFields(): string {
    let concat = 'Por favor preencha o campo';
    if (!this.pessoa.nome) {
      return concat + ' nome!';
    }
    if (!this.pessoa.sobreNome) {
      return concat + ' Sobre Nome!';
    }
    if (!this.pessoa.igreja) {
      return concat + ' Igreja!';
    }
    return null;
  }

  dialogAvisoVisitanteJaCadastrado(pessoa) {
    let obj = {} as any;
    obj.nome = pessoa.nome;
    obj.sobreNome = pessoa.sobreNome;
    obj.visitante = true;

    const dialogRef = this._dialog.open(DialogConfirmCriarVisitanteComponent, {
      width: '600px',
      data: {
        pessoaCadastrada: this._service.avisoVisitanteJaCadastrado(obj),
        pessoa:this.pessoa
      }
    });
  }


}
