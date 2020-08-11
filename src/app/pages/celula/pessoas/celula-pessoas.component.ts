import { CelulaService } from './../../../service/celula.service';
import { RedeService } from './../../../service/rede.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent, MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DialogTransferirPessoaComponent } from '../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component';


@Component({
  selector: 'app-celula-pessoas',
  templateUrl: './celula-pessoas.component.html',
  styleUrls: ['./celula-pessoas.component.scss']
})
export class CelulaPessoasComponent implements OnInit {

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public comboCelulas = [];
  public celulaSelecionada: any;
  public visaoCelular: boolean;
  public celulaValue: any;

  public igrejaSelecionada: any;

  public pessoas = new Array();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;

  public tipoPessoas = [
    { key: 'M', value: 'Membro' },
    { key: 'V', value: 'Visitante' }
  ]
  public tipoPessoaSelecionado: any;

  constructor(private _serviceRede: RedeService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog,
    private _service: CelulaService) { }

  ngOnInit() {
    this.getEmiter();
    this.columns();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarRede(this.igrejaSelecionada.id);
      }
      if (item.type == 'transferido') {
        this.onSelectionChange(item.data)
     }
    });
  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimento', value: 'Data Nascimento' },
      { id: 'rg', value: 'RG' },
      { id: 'cpf', value: 'CPF' },
      { id: 'estadoCivil', value: 'Estado Civil' },
      { id: 'sexo', value: 'Sexo' },
      { id: 'profissao', value: 'Profissao' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  carregarRede(id) {

    this._serviceRede.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    this.carregarCelula(this.redeSelecionada.id);
  }

  onSelectionChange(event) {
    if (this.celulaSelecionada) {
      switch (event.source.value) {
        case 'M':
          this.tipoPessoaSelecionado = 'M';
          this.getMembros(this.celulaSelecionada.id);
          break;
        case 'V':
          this.tipoPessoaSelecionado = 'V';
          this.getVisitantes(this.celulaSelecionada.id);
          break;
      }
    }
  }

  getMembros(id) {
    this._service.getMembros(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
      console.log(this.paginator);
    }, error => {
      // console.log(error);
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }

  getVisitantes(id) {
    this._service.getVisitantes(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }

  transferir(id) {
    let metodo: string;
    switch (this.tipoPessoaSelecionado) {
      case 'M':
        metodo = 'transferirIgrejaMembro';
        break;
      case 'V':
        metodo = 'transferirIgrejaVisitante';
        break;

    }
    const dialogRef = this._dialog.open(DialogTransferirPessoaComponent, {
      width: '600px',
      data: {
        pessoaId:id,
        metodo:metodo,
        controller:'celula',
        tipoPessoa:this.tipoPessoaSelecionado
      }
    });
  }

  carregarCelula(id) {

    this._service.getCelulaRede(id).pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      // console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCelula(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filterCelula(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionCelulaChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
  }



}
