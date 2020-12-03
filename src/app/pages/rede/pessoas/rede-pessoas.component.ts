import { RedeService } from './../../../service/rede.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent, MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DialogTransferirPessoaComponent } from '../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component';
import { UserService } from '../../../service/user.service';
import { IgrejaService } from '../../../service/igreja.service';
import { ExcelService } from '../../../service/excel.service';

@Component({
  selector: 'app-rede-pessoas',
  templateUrl: './rede-pessoas.component.html',
  styleUrls: ['./rede-pessoas.component.scss']
})
export class RedePessoasComponent implements OnInit {

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;

  public pessoas = new Array();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;

  public tipoPessoas = [
    { key: 'M', value: 'Membro' },
    { key: 'V', value: 'Visitante' }
  ]

  public tipoPessoaSelecionado: any;
  public form: FormGroup;

  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;
  public igrejaValue: any;

  constructor(private _service: RedeService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _igrejaService: IgrejaService,
    private _excelService: ExcelService) { }

  ngOnInit() {
    this.getEmiter();
    this.columns();
    this._buildForm();
    this.carregarIgrejas();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'transferido') {
        this.onSelectionClick(item.data)
     }
    });
  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimento', value: 'Data Nascimento' },
      { id: 'rg', value: 'RG' },
      { id: 'cpf', value: 'CPF' },
      { id: 'estadoCivil', value: 'Estado Civil' },
      { id: 'sexo', value: 'Sexo' },
      { id: 'profissao', value: 'Profissao' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  carregarRede(id) {

    this._service.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
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

  onSelectionRedeClick($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
  }

  onSelectionClick(key) {
    // console.log(key)
    if(!this._userService.hasPermission("combo_igreja_pessoa")){
      let user = this._userService.getMembroLogado();

      if(user.igreja){
        this.igrejaSelecionada = user.igreja;
      }
    }

    if (this.igrejaSelecionada) {
      switch (key) {
        case 'M':
          this.tipoPessoaSelecionado = 'M';
          this.getMembros(this.redeSelecionada.id);
          break;
        case 'V':
          this.tipoPessoaSelecionado = 'V';
          this.getVisitantes(this.redeSelecionada.id);
          break;
      }
    }
  }

  getMembros(id) {
    this._service.getMembros(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }

  getVisitantes(id) {
    this._service.getVisitantes(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }

  transferir(id) {
    let metodo: string;
    switch (this.tipoPessoaSelecionado) {
      case 'M':
        metodo = 'transferirIgrejaMembro';
        break;
      case 'V':
        metodo = 'transferirIgrejaVisitante';
        break;

    }
    const dialogRef = this._dialog.open(DialogTransferirPessoaComponent, {
      width: '600px',
      data: {
        pessoaId:id,
        metodo:metodo,
        controller:'rede',
        tipoPessoa:this.tipoPessoaSelecionado,
        igrejaId:this.igrejaSelecionada.id
      }
    });
  }


  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  onSelectionIgrejaClick(value){
    this.igrejaSelecionada = value;
    this.carregarRede(this.igrejaSelecionada.id);
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

  private _buildForm(): void {
    this.form = new FormGroup({
      'tipo': new FormControl(false),
    });
  }

  onBlurIgreja(event){
    if(!event.target.value){
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this.form.reset();
      this.redeSelecionada = null;
      this.redeValue = '';

    }
  }

  onBlurRede(event){
    if(!event.target.value){
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this.form.reset();
    }
  }

  exportAsXLSX() {
    let dados = [];
    this.pessoas.forEach(i => {
      dados.push({
        "Nome": i.nomeCompleto,
        "Data Nascimento": i.dataNascimento,
        "RG": i.rg,
        "CPF": i.cpf,
        "Estado Civil": i.estadoCivil,
        "Sexo": i.sexo,
        "Tprofissao": i.profissao,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }



}
