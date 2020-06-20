import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { IgrejaService } from '../../../service/igreja.service';
import { take, startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-cadastrar-igreja',
  templateUrl: './cadastrar-igreja.component.html',
  styleUrls: ['./cadastrar-igreja.component.scss']
})
export class CadastrarIgrejaComponent implements OnInit {

  public filteredIgreja: Observable<string[]>;
  public igrejaSelecionada: any;
  public igreja: any;
  public nomeValue: any;
  public dadosIgreja: any;
  public enderecos = [];
  public contatos: any;
  // public myControlIgreja = new FormControl();
  public comboIgrejaSede = [];
  public filteredIgrejaSede: Observable<string[]>;
  public myControlIgrejaSede = new FormControl();
  public nomePastorValue: string;
  public id: any;
  public dados = {} as any;
  public tipoIgreja: any;
  public sizeLimitOne: boolean = true;
  public filial: boolean = false;

  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: IgrejaService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getEmiter();
    this.carregarComboIgrejaSede();
    this.getParams();
    this.getEmiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.data);
      if (item.type == 'dadosIgreja') {
        this.dados = item.data;
      }
      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
      if (item.type == 'contatos') {
        this.contatos = item.data;
      }
      if (item.type == 'dadosIgrejaRadio') {
        this.filial = item.data;
      }
    });
  }

  setEmiter(save: boolean): void {
    if (save) {
      this._emitirEventoService.emitir("clear", "");
    }
    if (this.dados && !save) {
      console.log(this.dados)
      this._emitirEventoService.emitir("edit-dadosIgreja", this.dados);
    }
    if (this.enderecos && !save) {
      this._emitirEventoService.emitir("edit-endereco", this.enderecos);
    }
    if (this.contatos && !save) {
      this._emitirEventoService.emitir("edit-contatos", this.contatos);
    }
  }

  getDadosIgreja() {

    this.igreja = {} as any;
    this.igreja.nome = this.dados.nome;
    this.igreja.cnpj = HelperChurch.retirarFormatacaoCNPJ(this.dados.cnpj);
    this.igreja.telefone = this.dados.telefone;
    this.igreja.pessoas = this.dados.pessoas;
    this.igreja.visaoCelular = this.dados.visaoCelular;
    this.igreja.enderecos = this.enderecos;
    this.igreja.contatos = this.contatos;
    this.igreja.dataInauguracao = this.dados.dataInauguracao;

    if (this.id) {
      this.igreja.id = this.id;
    }
    if (this.igrejaSelecionada) {
      this.igreja.sede = this.igrejaSelecionada;
    }

    // console.log(this.igreja);x'
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.tipoIgreja = this._avRoute.snapshot.queryParamMap.get("tipo");
      this.getIgreja(this.id);
    }
  }

  salvar() {
    this.getDadosIgreja();
    if (!this.validFields()) {
      return;
    }
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    // console.log(this.igreja);
    this._service.save(this.igreja).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }



  carregarComboIgrejaSede() {

    this._service.getList().pipe(take(1)).subscribe(item => {
      this.comboIgrejaSede = item;
      // console.log(item);
      this.filteredIgrejaSede = this.myControlIgrejaSede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboIgrejaSede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedIgreja($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
  }

  voltar() {
    this._router.navigate(['/auth/igreja/pesquisar'], {
      queryParams: {
        //janela: 'Novo',
      },
      skipLocationChange: true
    });
  }


  getIgreja(id) {
    this._service.getSede(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.carregarDados(item);
      this.setEmiter(false);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }



  carregarDados(item) {
    this.dados.id = item.id
    this.dados.nome = item.nome
    this.dados.cnpj = item.cnpj;
    this.dados.pessoas = item.pessoas;
    this.dados.visaoCelular = item.visaoCelular;
    this.dados.dataAbertura = item.dataAbertura;
    this.dados.dataAberturaToDate = item.dataAberturaToDate;
    this.enderecos = item.enderecos;
    this.contatos = item.contatos;

    if (item.sede) {
      this.nomeValue = item.sede.nome;
      this.igrejaSelecionada = item.sede;
      this.dados.sede = {id:item.sede.id};
      this.filial = true;
    }
  }

  update() {
    // console.log(this.igreja);
    this._service.update(this.igreja).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  validFields(): boolean {
    if (!this.igreja.nome) {
      this._notifierService.notify(AlertType.Error, "Digite o nome da Igreja!");
      return false;
    }
    if (!this.igreja.cnpj) {
      this._notifierService.notify(AlertType.Error, "Digite o CNPJ Igreja!");
      return false;
    }
    if (this.igreja.pessoas.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Líderes");
      return false;
    }
    if (this.igreja.enderecos.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Endereço");
      return false;
    }
    if (this.igreja.contatos.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Contatos");
      return false;
    }
    if (!this.igreja.dataInauguracao) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione a Data de Inauguração");
      return false;
    }
    if (!this.igrejaSelecionada && this.filial) {
      this._notifierService.notify(AlertType.Error, "Por favor Selecione uma igreja!");
      return false;
    }

    return true;
  }


}
