import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { PermissoesService } from '../../../service/permissoes.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';

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
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;

  constructor(private _router: Router,
              private _permissoesService: PermissoesService,
              private _notifierService: NotifierService) { }


  ngOnInit() {
    this.columns();
    this.getList() 
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
    this._router.navigate(['/auth/permissoes/cadastrar'],{
      queryParams: {
        janela: 'Novo',
      },
      skipLocationChange: true
    });
  }
  editar(id) {
    this._router.navigate(['/auth/permissoes/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id:id
      },
      skipLocationChange: true
    });
  }

  getList() {
    this._permissoesService.getList().pipe(take(1)).subscribe(item => {
      console.log(item);
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

}
