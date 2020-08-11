import { DialogTransferirPessoaComponent } from './../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-igreja-pessoas',
  templateUrl: './igreja-pessoas.component.html',
  styleUrls: ['./igreja-pessoas.component.scss']
})
export class IgrejaPessoasComponent implements OnInit {

  public igrejaSelecionada: any;
  public pessoa;
  public tipoPessoaSelecionado: any;
  public tipoPessoas = [
    { key: 'M', value: 'Membro' },
    { key: 'V', value: 'Visitante' }
  ]

  public pessoas = new Array();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;



  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: IgrejaService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.getEmiter();
    this.columns();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
      }
      if (item.type == 'transferido') {
         this.onSelectionChange(item.data)
      }
    });
  }

  onSelectionChange(event) {
    if (this.igrejaSelecionada) {
      switch (event.source.value) {
        case 'M':
          this.tipoPessoaSelecionado = 'M';
          this.getMembros(this.igrejaSelecionada.id);
          break;
        case 'V':
          this.tipoPessoaSelecionado = 'V';
          this.getVisitantes(this.igrejaSelecionada.id);
          break;
      }
    }
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

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
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
        controller:'igreja',
        tipoPessoa:this.tipoPessoaSelecionado
      }
    });
  }

}
