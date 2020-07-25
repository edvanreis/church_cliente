import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { RedeService } from '../../../service/rede.service';
import { DialogAtivarInativarComponent } from '../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';

const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
];

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
  public redes = new Array();
  public statusSelecionado = 'A';
  public comboStatus = ELEMENT_DATA;


  constructor(private _router: Router,
    private _redeService: RedeService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute) { }

    ngOnInit() {
      this.columns();
      this.getList();
      this.getEmiter();
      this.getParams();
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
        { id: 'idade', value: 'Idade' },
        { id: 'nomeIgreja', value: 'Igreja' },
        { id: 'descricao', value: 'Descrição' },
        { id: 'id', value: 'Ação' }
      ];
      this.displayedColumns = this.columnNames.map(x => x.id);
    }

    cadastrar() {
      localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
      this._router.navigate(['/auth/rede/cadastrar'], {
        queryParams: {
          janela: 'Nova',
        },
        skipLocationChange: true
      });
    }

    editar(id) {
      localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
      this._router.navigate(['/auth/rede/cadastrar'], {
        queryParams: {
          janela: 'Editar',
          id: id
        },
        skipLocationChange: true
      });
    }

    getList() {
      this._redeService.getList().pipe(take(1)).subscribe(item => {
        this.redes = item;
        this.dados = new MatTableDataSource(item);
        this.dados.sort = this.sort;
        this.dados.paginator = this.paginator;
      }, error => {
        this._notifierService.notify(AlertType.Error, error.errors.message);

      });
    }


    getEmiter(): void {
      this._emitirEventoService.mensagem.subscribe(obj => {
        if (obj.data == 'status') {
          this.getListForStatus(this.statusSelecionado);
        }
      });
    }




  exportAsXLSX() {
    let dados = [];
    this.redes.forEach(i => {
      dados.push({
        "Nome": i.nome,
        "Data Abertura": i.dataAbertura,
        "Igreja": i.nomeIgreja,
        "Descrição": i.descricao,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }


  onSelection(){
    // console.log(this.statusSelecionado);
    this.getListForStatus(this.statusSelecionado);
  }

  getListForStatus(status) {
    this._redeService.getListForStatus(status).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.redes = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  status(id) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        controller:'rede'
      }
    });
  }

  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
      this.statusSelecionado = JSON.parse(localStorage.getItem("pesquisar"));
      localStorage.removeItem("pesquisar");
      this.getListForStatus(this.statusSelecionado);
    }
  }
}
