import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, DateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../../model/alert-type';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { EtapaVisaoService } from '../../../../service/etapa-visao.service';
import { ExcelService } from '../../../../service/excel.service';
import { MembroService } from '../../../../service/membro.service';
import { DialogAtivarInativarComponent } from '../../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';
import { DialogConfirmExcluirPesssoaComponent } from '../../../dialog/dialog-confirm-excluir-pessoa/dialog-confirm-excluir-pessoa.component';
import { DialogEnviarCartaComponent } from '../../../dialog/dialog-enviar-carta/dialog-enviar-carta.component';
import { DialogHistoricoPessoaComponent } from '../../../dialog/dialog-historico-pessoa/dialog-historico-pessoa.component';
import { HelperChurch } from './../../../../helper/helper.church';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
  { codigo: null, value: 'Todos' },
];

@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {



  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public comboSexo = [];
  public comboEstadoCivil = [];
  public comboStatus = ELEMENT_DATA;

  public form: FormGroup;
  public formDate: FormGroup;

  public membro = {} as any;


  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;
  public pessoas: any = [];

  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: MembroService,
    private _notifierService: NotifierService,
    private _excelService: ExcelService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _dateAdapter: DateAdapter<Date>
    ) { }




  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this.getEmiter();
    this.columns();
    this._buildForm();
    this._buildFormDate();
    this.getParams();
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
      'rg': new FormControl(''),
      'cpf': new FormControl(''),
      'sexo': new FormControl(''),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl(''),
      'profissao': new FormControl(''),
      'batizado': new FormControl(true),
      'dizimista': new FormControl(true),
      'membroDaCelula': new FormControl(false),
      'observacao': new FormControl(''),
      'cartaRecomendacao': new FormControl(false),
      'status': new FormControl('ATIVO'),
    });
  }

  getComboSexo() {
    this._service.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._service.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }

  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisa")) {
      this.membro = JSON.parse(localStorage.getItem("pesquisa"));
      localStorage.removeItem("pesquisa");
      this.pesquisar();
    }
  }


  private _buildFormDate(): void {
    this.formDate = new FormGroup({
      'dataInicioAt': new FormControl(''),
      'dataFimAt': new FormControl(''),
      'dataInicioIn': new FormControl(''),
      'dataFimIn': new FormControl('')
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'status') {
        this.pesquisar();
      }
      if (item.type == 'confirm-dialog-excluir-pessoa') {
        this.pesquisar();
      }
    });
  }

  pesquisar() {
    this.setObj();
    //  console.log(this.pessoa)
    this.loading = true;
    this._service.pesquisar(this.membro).pipe(take(1)).subscribe(item => {
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

    this.membro.nome = this.form.controls['nome'].value;
    this.membro.sobreNome = this.form.controls['sobrenome'].value;
    this.membro.sexo = this.form.controls['sexo'].value;
    this.membro.estadoCivil = this.form.controls['estadoCivil'].value;
    this.membro.dataNascimento = this.form.controls['dataNascimento'].value;
    this.membro.nacionalidade = this.form.controls['nacionalidade'].value;
    this.membro.profissao = this.form.controls['profissao'].value;
    this.membro.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.membro.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.membro.batizado = HelperChurch.isBoolean(this.form.controls['batizado'].value);
    this.membro.dizimista = HelperChurch.isBoolean(this.form.controls['dizimista'].value);
    this.membro.cartaRecomendacao = HelperChurch.isBoolean(this.form.controls['cartaRecomendacao'].value);
    this.membro.membroDaCelula = HelperChurch.isBoolean(this.form.controls['membroDaCelula'].value);
    this.membro.status = this.form.controls['status'].value;

    this.preencherPeriodosAtivacao();
    this.preencherPeriodosInativacao();
  }



  preencherPeriodosAtivacao() {
    if (this.formDate.controls['dataInicioAt'].value && this.formDate.controls['dataFimAt'].value) {
      this.membro.dataCriacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioAt'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.membro.dataCriacaoFim = this._datePipe.transform(this.formDate.controls['dataFimAt'].value, 'yyyy-MM-dd') + " 23:59:59";
    }
  }

  preencherPeriodosInativacao() {
    if (this.formDate.controls['dataInicioIn'].value && this.formDate.controls['dataFimIn'].value) {
      this.membro.dataInativacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioIn'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.membro.dataInativacaoFim = this._datePipe.transform(this.formDate.controls['dataFimIn'].value, 'yyyy-MM-dd') + " 23:59:59";
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
        "Profissao": i.profissao,
        "Etapa Visão": i.etapasStr
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }


  setFieldFormControl(field, value) {
    this.form.controls[field].patchValue(value)
  }

  editar(id) {
    this.setObj();
    localStorage.setItem("pesquisa", JSON.stringify(this.membro));
    this._router.navigate(['/auth/membro/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }



  enviarCarta(id) {
    const dialogRef = this._dialog.open(DialogEnviarCartaComponent, {
      width: '600px',
      data: {
        id: id
      }
    });
  }

  historico(id) {
    console.log(id)
    const dialogRef = this._dialog.open(DialogHistoricoPessoaComponent, {
      width: '900px',
      data: {
        history: this._service.getHistory(id)
      }
    });
  }

  status(id,status) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        status:status,
        controller: 'pessoa'
      }
    });
  }

  dialogExcluirMembro(id) {
    const dialogRef = this._dialog.open(DialogConfirmExcluirPesssoaComponent, {
      width: '600px',
      data: {
        id: id
      }
    });
  }

  cadastrar() {
    this._router.navigate(['/auth/membro/cadastrar']);
  }


}
