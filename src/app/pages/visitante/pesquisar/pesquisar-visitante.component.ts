import { VisitanteService } from './../../../service/visitante.service';
import { MembroService } from './../../../service/membro.service';
import { CelulaService } from './../../../service/celula.service';
import { RedeService } from './../../../service/rede.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MatSort, MatPaginator, MatTableDataSource, DateAdapter, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { AlertType } from '../../../model/alert-type';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogConfirmExcluirPesssoaComponent } from '../../dialog/dialog-confirm-excluir-pessoa/dialog-confirm-excluir-pessoa.component';
import { map, startWith, take } from 'rxjs/operators';





@Component({
  selector: 'app-pesquisar-visitante',
  templateUrl: './pesquisar-visitante.component.html',
  styleUrls: ['./pesquisar-visitante.component.scss']
})
export class PesquisarVisitanteComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: VisitanteService,
    private _serviceMembro: MembroService,
    private _notifierService: NotifierService,
    private _excelService: ExcelService,
    private _datePipe: DatePipe,
    private _etapaVisao: EtapaVisaoService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog,
    private _redeService: RedeService,
    private _celulaService: CelulaService) { }

  public etapa$: Observable<any[]>;
  public visitante: any = {} as any;
  public enderecos: any;
  public comboTipoContatos = [];
  public comboEscolaridade = []
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;
  public pessoas: any = [];
  public form: FormGroup;
  public formDate: FormGroup;
  public dadosPessoais: any;
  public celula: any;

  public comboSexo = [];
  public comboEstadoCivil = [];
  public igrejaSelecionada: any;


  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public comboCelulas = [];
  public celulaSelecionada: any;
  public visaoCelular: boolean;
  public celulaValue: any;



  ngOnInit() {
    this.dateAdapter.setLocale('br');
    this.getEmiter();
    this.columns();
    this._buildFormDate();
    this.getComboEtapaVisao();
    this.getParams();
    this._buildForm();
    this.getComboSexo();
    this.getComboEstadoCivil();
    // console.log(JSON.parse(this.user.currentUser()));
    // console.log(JSON.parse(this.user.currentUser()).name);
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'sobrenome': new FormControl(''),
      'dataNascimento': new FormControl(''),
      'sexo': new FormControl(''),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl(''),
      'dataCultoIgreja': new FormControl(''),
      'dataCultoRede': new FormControl(''),
      'dataReuniaoCelula': new FormControl(''),
    });
  }

  getComboSexo() {
    this._serviceMembro.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._serviceMembro.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }


  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisa")) {

      if(this._avRoute.snapshot.queryParamMap.get("editar")){
          this.visitante = JSON.parse(localStorage.getItem("pesquisa"));
          localStorage.removeItem("pesquisa");
          this.pesquisar(true);
      }

    }
  }


  private _buildFormDate(): void {
    this.formDate = new FormGroup({
      'dataInicioAt': new FormControl(''),
      'dataFimAt': new FormControl('')
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'confirm-dialog-excluir-pessoa') {
        this.pesquisar(false);
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
        this.carregarRede(this.igrejaSelecionada.id);
      }
    });
  }

  pesquisar(editar) {
    if(!editar){
      this.setObj();
    }
    //  console.log(this.pessoa)
    this.loading = true;
    this._service.pesquisar(this.visitante).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.loading = false;
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }





  setObj() {
    this.visitante.nome = this.form.controls['nome'].value;
    this.visitante.sobreNome = this.form.controls['sobrenome'].value;
    this.visitante.sexo = this.form.controls['sexo'].value;
    this.visitante.estadoCivil = this.form.controls['estadoCivil'].value;
    this.visitante.dataNascimento = this.form.controls['dataNascimento'].value;
    this.visitante.nacionalidade = this.form.controls['nacionalidade'].value;
    this.visitante.dataCultoIgreja = this.form.controls['dataCultoIgreja'].value;
    this.visitante.dataCultoRede = this.form.controls['dataCultoRede'].value;
    this.visitante.dataReuniaoCelula = this.form.controls['dataReuniaoCelula'].value;


    if (this.igrejaSelecionada) {
      this.visitante.igreja = { id: this.igrejaSelecionada.id };
    }
    if (this.redeSelecionada) {
      this.visitante.rede = { id: this.redeSelecionada.id };
    }
    if (this.celulaSelecionada) {
      this.visitante.celula = { id: this.celulaSelecionada.id };
      this.visitante.visitanteDaCelula = true;
    }

    console.log(this.visitante)

    this.preencherPeriodos();
  }



  preencherPeriodos() {
    if (this.formDate.controls['dataInicioAt'].value && this.formDate.controls['dataFimAt'].value) {
      this.visitante.dataCriacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioAt'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.visitante.dataCriacaoFim = this._datePipe.transform(this.formDate.controls['dataFimAt'].value, 'yyyy-MM-dd') + " 23:59:59";
    }

  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimento', value: 'Data Nascimento' },
      { id: 'sexo', value: 'Sexo' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  exportAsXLSX() {
    let dados = [];
    this.pessoas.forEach(i => {
      dados.push({
        "Nome": i.nome,
        "Sobre nome": i.sobreNome,
        "Data Nascimento": i.dataNascimentoFormatada,
        "rg": i.rg,
        "cpf": i.cpf,
        "Estado Civil": i.estadoCivil,
        "Sexo Civil": i.sexo,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }


  getComboEtapaVisao() {
    this.etapa$ = this._etapaVisao.getList();
  }

  setFieldFormControl(field, value) {
    this.form.controls[field].patchValue(value)
  }

  editar(id) {
    this.setObj();
    localStorage.setItem("pesquisa", JSON.stringify(this.visitante));
    this._router.navigate(['/auth/visitante/cadastrar'], {
      queryParams: {
        editar: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  importar(id) {
    this.setObj();
    localStorage.setItem("pesquisa", JSON.stringify(this.visitante));
    this._router.navigate(['/auth/membro/cadastrar'], {
      queryParams: {
        janela: 'Importar',
        visitanteId: id,
        importacao: true
      },
      skipLocationChange: true
    });
  }

  dialogExcluirVisitante(id) {
    const dialogRef = this._dialog.open(DialogConfirmExcluirPesssoaComponent, {
      width: '600px',
      data: {
        id: id
      }
    });
  }

  carregarRede(id) {

    this._redeService.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    if (this.visaoCelular) {
      this.carregarCelula(this.redeSelecionada.id);
    }
  }

  carregarCelula(id) {

    this._celulaService.getCelulaRede(id).pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      // console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCelula(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filterCelula(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionCelulaChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
  }

  cadastrar() {
    this._router.navigate(['/auth/visitante/cadastrar']);
  }



}
