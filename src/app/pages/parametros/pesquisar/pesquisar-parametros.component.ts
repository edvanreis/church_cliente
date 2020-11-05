import { DialogConfirmParametrosComponent } from './../../dialog/dialog-confirm-parametros/dialog-confirm-parametros.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { ParametrosService } from '../../../service/parametros.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-pesquisar-parametros',
  templateUrl: './pesquisar-parametros.component.html',
  styleUrls: ['./pesquisar-parametros.component.scss']
})
export class PesquisarParametrosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public parametros:any;

  constructor(private _service:ParametrosService,
    private _router: Router,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.getList();
    this.columns();
    this.getEmiter();
  }

  cadastrar(){
    this._router.navigate(['/auth/parametros/cadastrar']);
  }

  getList() {
    this._service.getList().pipe(take(1)).subscribe(item => {
      this.parametros = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      this.dados = new MatTableDataSource<Element>(this.parametros);
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  columns() {
    this.columnNames = [
      { id: 'tipo', value: 'Tipo Parametro' },
      { id: 'email', value: 'Email' },
      { id: 'descricao', value: 'Descrição' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  editar(id) {
    this._router.navigate(['/auth/parametros/cadastrar'], {
      queryParams: {
        id: id
      },
      skipLocationChange: true
    });
  }


  dialogRemover(id) {
    const dialogRef = this._dialog.open(DialogConfirmParametrosComponent, {
      width: '600px',
      data: {
        id: id
      }
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.type == 'confirm-dialog-parametro') {
        this.getList();
      }
    });
  }



}
