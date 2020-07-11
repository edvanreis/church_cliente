import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissoesService } from '../../../service/permissoes.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { DialogRemoverPermissaoComponent } from '../../dialog/dialog-remover-permissao/dialog-remover-permissao.component';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-pesquisar-permissoes',
  templateUrl: './pesquisar-permissoes.component.html',
  styleUrls: ['./pesquisar-permissoes.component.scss']
})
export class PesquisarPermissoesComponent implements OnInit {

  public form: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginat') paginator: MatPaginator;
  public pageIndex: number = 0;

  public permissoes = new Array();

  constructor(private _router: Router,
    private _permissoesService: PermissoesService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService) { }


  ngOnInit() {
    this.columns();
    this.getList();
    this.emiter();
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'nome', value: 'Nome' },
      { id: 'descricao', value: 'Descrição' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }


  cadastrar() {
    this._router.navigate(['/auth/permissoes/cadastrar'], {
      queryParams: {
        janela: 'Nova',
      },
      skipLocationChange: true
    });
  }
  editar(id) {
    this._router.navigate(['/auth/permissoes/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  getList() {
    this._permissoesService.getList().pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.permissoes = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      console.log(this.dados)
      console.log(this.sort)
      console.log(this.paginator)
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  remover(id) {
    const dialogRef = this._dialog.open(DialogRemoverPermissaoComponent, {
      width: '600px',
      data: {
        id: id,
        tela: 'permissoes',
        panelClass: 'components-container-gt-xs'
      }
    });
  }

  emiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'remove') {
        this.getList();
      }
    });
  }

}
