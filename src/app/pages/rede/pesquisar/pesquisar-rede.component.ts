import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PermissoesService } from '../../../service/permissoes.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { RedeService } from '../../../service/rede.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pesquisar-rede',
  templateUrl: './pesquisar-rede.component.html',
  styleUrls: ['./pesquisar-rede.component.scss']
})
export class PesquisarRedeComponent implements OnInit {

  public form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;

  constructor(private _router: Router,
    private _permissoesService: RedeService,
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
        { id: 'dataAbertura', value: 'Data Abertura' },
        { id: 'nomeIgreja', value: 'Igreja' },
        { id: 'descricao', value: 'Descrição' },
        { id: 'id', value: 'Ação' }
      ];
      this.displayedColumns = this.columnNames.map(x => x.id);
    }

    cadastrar() {
      this._router.navigate(['/auth/rede/cadastrar'], {
        queryParams: {
          janela: 'Nova',
        },
        skipLocationChange: true
      });
    }
    editar(id) {
      this._router.navigate(['/auth/rede/cadastrar'], {
        queryParams: {
          janela: 'Editar',
          id: id
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

    
    emiter(): void {
      this._emitirEventoService.mensagem.subscribe(obj => {
        if (obj.data == 'remove') {
          this.getList();
        }
      });
    }

    // remover(id) {
    //   const dialogRef = this._dialog.open(DialogRemoverPermissaoComponent, {
    //     width: '600px',
    //     data: {
    //       id: id,
    //       tela:'permissoes',
    //       panelClass: 'components-container-gt-xs'
    //     }
    //   });
    // }

}
