import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) { }


  ngOnInit() {
    this._buildForm();
    this.columns();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
    });
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


  add() {
    this._router.navigate(['/auth/configuracoes/cadastrar-permissoes'],{
      queryParams: {
        janela: 'Novo',
      },
      skipLocationChange: true
    });
  }
  edit(id) {
    this._router.navigate([id+'/cadastrar-permissoes'], {
      queryParams: {
        janela: 'Editar',
      },
      skipLocationChange: true
    });
  }

}
