import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { DialogAddTitulosLicaoComponent } from '../../dialog/dialog-add-titulos-licao/dialog-add-titulos-licao.component';
import { LicaoService } from '../../../service/licao.service';
import { take } from 'rxjs/operators';
import { DialogConfirmLicaoComponent } from '../../dialog/dialog-confirm-licao/dialog-confirm-licao.component';
import { ExcelService } from '../../../service/excel.service';

@Component({
  selector: 'app-pesquisar-licao',
  templateUrl: './pesquisar-licao.component.html',
  styleUrls: ['./pesquisar-licao.component.scss']
})
export class PesquisarLicaoComponent implements OnInit {

  public form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  public licoes = [];
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;

  constructor(private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _service: LicaoService,
    private _excelService: ExcelService) { }

  ngOnInit() {
    this.columns();
    this.getList();
    this.getEmiter();
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'tema', value: 'Tema' },
      { id: 'dataCriacao', value: 'Data' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getList() {
    this._service.getList().pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.licoes = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'licao-titulo-dialog' || item.type == 'confirm-dialog-licao') {
        this.getList();
      }
    });
  }

  dialogAdd() {
    const dialogRef = this._dialog.open(DialogAddTitulosLicaoComponent, {
      width: '600px',
    });
  }

  dialogEdit(id) {
    const dialogRef = this._dialog.open(DialogAddTitulosLicaoComponent, {
      width: '600px',
      data: {
        id: id,
        dataSource :this._service.getLicao(id)
      }
    });
  }

  dialogRemove(id) {
    const dialogRef = this._dialog.open(DialogConfirmLicaoComponent, {
      width: '600px',
      data: {
        id: id,
      }
    });
  }

  exportAsXLSX() {
    let dados = [];
    this.licoes.forEach(i => {
      dados.push({
        "Tema": i.tema,
        "Data": i.dataCriacao,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }
}
