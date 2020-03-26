import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { RedeService } from '../../../service/rede.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { CelulaService } from '../../../service/celula.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

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

  constructor(private _router: Router,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService) { }

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
        { id: 'dia', value: 'Dia' },
        { id: 'turno', value: 'Turno' },
        { id: 'horario', value: 'Horário' },
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

    emiter(): void {
      this._emitirEventoService.mensagem.subscribe(obj => {
        if (obj.data == 'remove') {
          this.getList();
        }
      });
    }

    getList() {
      this._celulaService.getList().pipe(take(1)).subscribe(item => {
        console.log(item)
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
}
