import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { ContatoService } from '../../../service/contato.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { PessoaService } from '../../../service/pessoa.service';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { CargoService } from '../../../service/cargo.service';
import { EscolaridadeService } from '../../../service/escolaridade.service';


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
  public cargos: any = [];
  public celula: any;
  public igreja: any;
  public pessoa = {} as any;
  public id: any;
  public pesquisa: boolean = false;
  public importacao: boolean = false;
  public isCelula = true;


  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: PessoaService,
    private _enderecoService: EnderecoService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _contatoService: ContatoService,
    private _etapaVisaoService: EtapaVisaoService,
    private _cargosService: CargoService,
    private _escolaridadeService: EscolaridadeService) { }

  ngOnInit() {
    this.getParams();
    this.getEmiter();
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPessoa(this.id);
      this.pesquisa = true;
    }
    if (this._avRoute.snapshot.queryParamMap.get("importacao")) {
      this.importacao = true;;
    }
  }

  getPessoa(id) {
    this._service.obterPessoa(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.emitirPessoa(item);
      this.getEndereco(item.id)
      this.getContatos(item.id);
      this.getEscolaridades(item.id);
      this.getEtapas(item.id);
      this.getCargos(item.id);
      this.emitirIgreja(item.igreja);
      this.emitirCelula(item.celula);
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

  getEtapas(id) {
    // console.log(id)
    this._etapaVisaoService.obterEtapaPessoa(id).pipe(take(1)).subscribe(item => {
      this.emitirEtapaVisao(item);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }
  getCargos(id) {
    // console.log(id)
    this._cargosService.obterPessoaCargo(id).pipe(take(1)).subscribe(item => {
      this.emitirPessoaCargo(item);
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
      if (item.type == 'cargos-comp') {
        this.cargos = item.data;
      }

    });
  }

  salvar() {
    this.setObj();
    let mensagem = this.validFields();
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
      // console.log(this.dadosPessoais)
      if (this.dadosPessoais) {
        this.pessoa = this.dadosPessoais;
        this.pessoa.id = this.id;
        this.pessoa.membro = true;
        this.pessoa.visitante = false;
      }
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

    if (this.etapas) {
      this.pessoa.etapas = this.etapas;
    }

    if (this.cargos) {
      this.pessoa.cargos = this.cargos;
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

  emitirEtapaVisao(item): void {
    this._emitirEventoService.emitir('edit-etapa-visao', item);
  }

  emitirPessoaCargo(item): void {
    this._emitirEventoService.emitir('edit-cargos', item);
  }

  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
  }

  emitirCelula(item): void {
    this.isCelula = true;
    this._emitirEventoService.emitir('edit-celula', item);
  }


  voltar() {
    let caminho: string = "";
    if (this.importacao) {
      caminho = "/auth/visitante/pesquisar";
    } else {
      caminho = "/auth/membro/pesquisar";
    }

    this._router.navigate([caminho], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }

  validFields(): string {
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
    if (!this.pessoa.igreja) {
      return concat + ' Igreja!';
    }

    return null;
  }

}
