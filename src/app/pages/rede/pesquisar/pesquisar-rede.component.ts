import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { IgrejaService } from '../../../service/igreja.service';
import { RedeService } from '../../../service/rede.service';
import { DialogAtivarInativarComponent } from '../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';

const ELEMENT_DATA = [
  { codigo: 'ATIVO', value: 'Ativo' },
  { codigo: 'INATIVO', value: 'Inativo' },
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
  public statusSelecionado = 'ATIVO';
  public comboStatus = ELEMENT_DATA;


  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;
  public igrejaValue: any;

  public loading: boolean = false;


  constructor(private _router: Router,
    private _redeService: RedeService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute,
    private _igrejaService: IgrejaService) { }

    ngOnInit() {
      this.columns();
      this.getList();
      this.carregarIgrejas();
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
        { id: 'nomeIgreja', value: 'Igreja' },
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

      let obj = {} as any;
      if(this.igrejaSelecionada){
        obj.igreja = {
                      id:this.igrejaSelecionada.id,
                      nome:this.igrejaSelecionada.nome
                    };
      }
      obj.status = this.statusSelecionado;
      localStorage.setItem("pesquisar", JSON.stringify(obj));
      this._router.navigate(['/auth/rede/cadastrar'], {
        queryParams: {
          janela: 'Editar',
          id: id
        },
        skipLocationChange: true
      });
    }

    getList() {
      this.loading = true;
      this._redeService.getList().pipe(take(1)).subscribe(item => {
        this.redes = item;
        this.dados = new MatTableDataSource(item);
        this.dados.sort = this.sort;
        this.dados.paginator = this.paginator;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.redes = [];
        this.dados = new MatTableDataSource<Element>(this.redes);
        this._notifierService.notify(AlertType.Error, error.errors.message);

      });
    }


    getEmiter(): void {
      this._emitirEventoService.mensagem.subscribe(obj => {
        if (obj.data == 'status') {
          this.obterListaRedes();
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



  obterListaRedes() {
    if(!this.validFields()){
      return;
    }

    this._redeService.obterListaRedes(this.obj()).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.redes = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  validFields(){
    if(!this.igrejaSelecionada){
      this._notifierService.notify(AlertType.Error, "Por Favor Selecione uma Igreja!");
      return false;
    }
    if(!this.statusSelecionado){
      this._notifierService.notify(AlertType.Error, "Por Favor Selecione um status!");
      return false;
    }
    return true;
  }

  obj(){
    return {
      igreja:{id:this.igrejaSelecionada.id},
      status:this.statusSelecionado
    }
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
      let obj = JSON.parse(localStorage.getItem("pesquisar"));
      if(obj.igreja){
        this.igrejaSelecionada = obj.igreja;
        this.igrejaValue = obj.igreja.nome;
        this.obterListaRedes();
        }
      }
      localStorage.removeItem("pesquisar");
      // this.getListForStatus(this.statusSelecionado);
    }


  onSelectionIgrejaClick(value){
    this.igrejaSelecionada = value;
    this.obterListaRedes();
  }

  carregarIgrejas() {

    this._igrejaService.getListIdAndName().pipe(take(1)).subscribe(item => {
      this.comboIgrejas = item;
      // console.log(item);
      this.filteredIgreja = this.myControlIgreja.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterIgreja(value, this.comboIgrejas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas!");
    });
  }

  private _filterIgreja(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

}
