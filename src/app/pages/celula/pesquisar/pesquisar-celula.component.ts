import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
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
  public statusSelecionado = 'ATIVO';

  public loading: boolean = false;

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;


  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;
  public igrejaValue: any;

  constructor(private _router: Router,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute,
    private _serviceRede: RedeService,
    private _igrejaService: IgrejaService) { }

  ngOnInit() {
    this.columns();
    this.getEmiter();
    this.carregarIgrejas();
    this.getList();
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
      { id: 'dia', value: 'Dia' },
      { id: 'turno', value: 'Turno' },
      { id: 'horaInicio', value: 'Hora Inicio' },
      { id: 'horaFim', value: 'Hora Fim' },
      { id: 'dataAbertura', value: 'Data Abertura' },
      { id: 'idade', value: 'Idade' },
      { id: 'nomeRede', value: 'Rede' },
      { id: 'tipoCelula', value: 'Tipo Pessoas' },
      { id: 'digitalStr', value: 'Digital' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'status') {
        this.getListForPorStatusAndRede();
      }
    });
  }

  getList() {
    this.loading = true;
    this._celulaService.getList().pipe(take(1)).subscribe(item => {
      this.celulas = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.celulas = [];
      this.dados = new MatTableDataSource<Element>(this.celulas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }


  cadastrar() {
    this._router.navigate(['/auth/celula/cadastrar']);
  }


  exportAsXLSX() {
    let dados = [];
    this.celulas.forEach(i => {
      dados.push({
        "Nome": i.nome,
        "dia": i.dia,
        "Turno": i.turno,
        "Hora Inicio": i.horaInicio,
        "Hora Fim": i.horaFim,
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
    let obj = {} as any;
    if(this.igrejaSelecionada){
      obj.igreja = {
                    id:this.igrejaSelecionada.id,
                    nome:this.igrejaSelecionada.nome
                  };
    }
    if(this.redeSelecionada){
      obj.rede = {
                  id:this.redeSelecionada.id,
                  nome:this.redeSelecionada.nome
                };
    }
    obj.status = this.statusSelecionado;

    localStorage.setItem("pesquisar", JSON.stringify(obj));
    this._router.navigate(['/auth/celula/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  dialogStatus(id,status) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        status:status,
        controller: 'celula'
      }
    });
  }


  getListForPorStatusAndRede() {

    if(!this.validFields()){
      return;
    }
    this._celulaService.getListForPorStatusAndRede(this.obj()).pipe(take(1)).subscribe(item => {
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

  obj(){
    return {
      status:this.statusSelecionado,
      rede:{id:this.redeSelecionada.id}
    }
  }

  validFields(){
    if(!this.igrejaSelecionada){
      this._notifierService.notify(AlertType.Error, "Por Favor Selecione uma Igreja!");
      return false;
    }

    if(!this.redeSelecionada){
      this._notifierService.notify(AlertType.Error, "Por Favor Selecione uma Rede!");
      return false;
    }
    if(!this.statusSelecionado){
      this._notifierService.notify(AlertType.Error, "Por Favor Selecione um status!");
      return false;
    }
    return true;
  }

  getParams() {
    //  console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
      let obj = JSON.parse(localStorage.getItem("pesquisar"));
      if(obj.igreja){
        this.igrejaSelecionada = obj.igreja;
        this.igrejaValue = obj.igreja.nome;
      }
      if(obj.rede){
        this.redeSelecionada = obj.rede;
        this.redeValue = obj.rede.nome;
      }
      localStorage.removeItem("pesquisar");
      if(this.igrejaSelecionada && this.igrejaSelecionada){
        this.getListForPorStatusAndRede();
      }
    }
  }


  carregarRede(id) {

    this._serviceRede.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
    });
  }

  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    this.getListForPorStatusAndRede();
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


  onBlurIgreja(event){
    if(!event.target.value){
      this.filteredRede = null;
    }
  }

  onSelectionIgrejaClick(value){
    this.igrejaSelecionada = value;
    this.carregarRede(this.igrejaSelecionada.id);
  }

}
