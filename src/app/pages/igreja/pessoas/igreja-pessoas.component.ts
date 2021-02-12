import { DialogTransferirPessoaComponent } from './../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, startWith, take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { UserService } from '../../../service/user.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ExcelService } from '../../../service/excel.service';


@Component({
  selector: 'app-igreja-pessoas',
  templateUrl: './igreja-pessoas.component.html',
  styleUrls: ['./igreja-pessoas.component.scss']
})
export class IgrejaPessoasComponent implements OnInit {

  public tipoPessoaSelecionado: any;
  public tipoPessoas = [
    { key: 'M', value: 'Membro' },
    { key: 'V', value: 'Visitante' }
  ]

  public pessoas = new Array();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;

  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;
  public igrejaValue: any;
  public form: FormGroup;



  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: IgrejaService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _igrejaService: IgrejaService,
    private _excelService: ExcelService
    ) { }

  ngOnInit() {
    this.getEmiter();
    this.columns();
    this.carregarIgrejas();
    this._buildForm();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'transferido') {
        console.log('user')
         this.onSelectionClick(item.data)
      }
    });
  }

  onSelectionClick(key) {
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
          this.getMembros(this.igrejaSelecionada.id);
          break;
        case 'V':
          this.tipoPessoaSelecionado = 'V';
          this.getVisitantes(this.igrejaSelecionada.id);
          break;
      }
    }
  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimento', value: 'Data Nascimento' },
      { id: 'estadoCivil', value: 'Estado Civil' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getMembros(id) {
    this._service.getMembros(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
      console.log(this.paginator);
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

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
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
        controller:'igreja',
        tipoPessoa:this.tipoPessoaSelecionado
      }
    });
  }

  onBlurIgreja(event){
    if(!event.target.value){
      this.pessoas = [];
      this.dados = new MatTableDataSource<Element>(this.pessoas);
      this.form.reset();
    }
  }

  onSelectionIgrejaClick(value){
    this.igrejaSelecionada = value;
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


  hasPermission(param):boolean{
    return this._userService.hasPermission(param)
  }



}
