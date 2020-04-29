import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { CelulaService } from '../../../service/celula.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { DialogAtivarInativarComponent } from '../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';
import { ElementData } from '@angular/core/src/view';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
];

@Component({
  selector: 'app-pesquisar-celula',
  templateUrl: './pesquisar-celula.component.html',
  styleUrls: ['./pesquisar-celula.component.scss']
})
export class PesquisarCelulaComponent implements OnInit {

  public form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public celulas = new Array();
  public comboStatus = ELEMENT_DATA;
  public statusSelecionado = 'A';

  constructor(private _router: Router,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.columns();
    this.getEmiter();
    if (!this.getParams()) {
      this.getList();
    }
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'status', value: 'Status' },
      { id: 'nome', value: 'Nome' },
      { id: 'dia', value: 'Dia' },
      { id: 'turno', value: 'Turno' },
      { id: 'horario', value: 'Horário' },
      { id: 'dataAbertura', value: 'Data Abertura' },
      { id: 'nomeRede', value: 'Rede' },
      { id: 'tipoCelula', value: 'Tipo Pessoas' },
      { id: 'cep', value: 'CEP' },
      { id: 'logradouro', value: 'Logradouro' },
      { id: 'numero', value: 'Número' },
      { id: 'bairro', value: 'bairro' },
      { id: 'localidade', value: 'Localidade' },
      { id: 'uf', value: 'Estado' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'status') {
        this.getListForStatus(this.statusSelecionado);
      }
    });
  }

  getList() {
    this._celulaService.getList().pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.celulas = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  cadastrar() {
    this._router.navigate(['/auth/celula/cadastrar'], {
      queryParams: {
        janela: 'Nova',
      },
      skipLocationChange: true
    });
  }


  exportAsXLSX() {
    let dados = [];
    this.celulas.forEach(i => {
      dados.push({
        "Nome": i.nome,
        "dia": i.dia,
        "Turno": i.turno,
        "Horário": i.horario,
        "Data Abertura": i.dataAbertura,
        "Tipo Pessoas": i.tipoCelula,
        "CEP": i.cep,
        "Logradouro": i.logradouro,
        "Número": i.numero,
        "Bairro": i.bairro,
        "Localidade": i.localidade,
        "Estado": i.uf
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }

  editar(id) {
    // console.log(id)
    localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/celula/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  status(id) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        controller: 'celula'
      }
    });
  }

  onSelection() {
    // console.log(this.statusSelecionado);
    this.getListForStatus(this.statusSelecionado);
  }

  getListForStatus(status) {
    this._celulaService.getListForStatus(status).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.celulas = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  getParams(): boolean {
    //  console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
      this.statusSelecionado = JSON.parse(localStorage.getItem("pesquisar"));
      localStorage.removeItem("pesquisar");
      this.getListForStatus(this.statusSelecionado);
      return true;
    } else {
      return false;
    }
  }
}
