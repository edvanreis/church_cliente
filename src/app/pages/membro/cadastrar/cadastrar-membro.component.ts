import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { ContatoService } from '../../../service/contato.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { PessoaService } from '../../../service/pessoa.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastrar-membro.component.html',
  styleUrls: ['./cadastrar-membro.component.scss']
})
export class CadastrarMembroComponent implements OnInit {

  public dadosPessoais: any;
  public enderecos: any;
  public escolaridades: any = [];
  public contatos: any = [];
  public etapas: any = [];
  public celula: any;
  public igreja: any;
  public pessoa = {} as any;
  public id: any;
  public pesquisa: boolean = false;


  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: PessoaService,
    private _enderecoService: EnderecoService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _contatoService: ContatoService) { }

  ngOnInit() {
    this.getEmiter();
    this.getParams();
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPessoa(this.id);
      this.pesquisa = true;
    }
  }

  getPessoa(id) {
    this._service.obterPessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirPessoa(item);
      this.getEndereco(item.id)
      this.getContatos(item.id);
      this.getEscolaridades(item.id);
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
        this.celula = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igreja = item.data;
      }
      if (item.type == 'etapas-comp') {
        this.etapas = item.data;
      }

    });
  }

  salvar() {
    this.setObj();
    let mensagem = this.validarCampos();
    if (mensagem) {
      this._notifierService.notify(AlertType.Error, mensagem);
      return false;
    }
    if (!this.pessoa.id) {
      this.save();
    } else {
      this.updade();
    }
  }

  save() {
    this._service.save(this.pessoa).pipe(take(1)).subscribe(item => {
      this.emitiClear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  updade() {
    this._service.update(this.pessoa).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  setObj() {
    this.getEmiter();
    if (this.dadosPessoais) {
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
      this.pessoa.membro = true;
    }
    if (this.enderecos) {
      this.pessoa.enderecos = this.enderecos;
    }
    if (this.contatos) {
      this.pessoa.contatos = this.contatos;
    }
    if (this.escolaridades) {
      this.pessoa.escolaridades = this.escolaridades;
    }
    if (this.celula) {
      this.pessoa.celula = this.celula;
    }

    if (this.igreja) {
      this.pessoa.igreja = this.celula;
    }

    if (this.etapas) {
      this.pessoa.etapas = this.etapas;
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

  voltar() {
    this._router.navigate(['/auth/membro/pesquisar'], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }

  validarCampos(): string {
    console.log( 'tes')
    let concat = 'Por favor preencha o campo';
    let concatArray = 'Por favor adicione pelo menos um';
    if (!this.pessoa.nome) {
      return concat + ' nome!';
    }
    if (!this.pessoa.sobreNome) {
      return concat + ' Sobre Nome!';
    }
    if (!this.pessoa.rg) {
      return concat + ' RG!';
    }
    if (!this.pessoa.cpf) {
      return concat + ' CPF!';
    }
    if (!this.pessoa.dataNascimento) {
      return concat + ' Data Nascimento!';
    }
    if (!this.pessoa.sexo) {
      return concat + ' Sexo!';
    }
    if (!this.pessoa.estadoCivil) {
      return concat + ' Estado Civil!';
    }
    if (!this.pessoa.nacionalidade) {
      return concat + ' Nacionalidade!';
    }
    if (this.enderecos.length == 0) {
      return concatArray + ' Endereço!';
    }
    if (this.enderecos.length == 0) {
      return concatArray + ' Contato!';
    }
    if (this.escolaridades.length == 0) {
      return concatArray + 'a  Esconlaridade!';
    }
    if (this.etapas.length == 0) {
      return concatArray + 'a  Etapa da visão!';
    }
    return null;
  }

}
