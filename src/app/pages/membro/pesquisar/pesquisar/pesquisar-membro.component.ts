import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { MembroService } from '../../../../service/membro.service';
import { Membro } from '../../../../model/membro';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../../model/alert-type';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../../../../service/excel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HelperChurch } from '../../../../helper/helper.church';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { EtapaVisaoService } from '../../../../service/etapa-visao.service';
import { UserService } from '../../../../service/user.service';


@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService,
    private _membroService: MembroService,
    private _notifierService: NotifierService,
    private _excelService: ExcelService,
    private _datePipe: DatePipe,
    private _etapaVisao: EtapaVisaoService, private user: UserService) { }

  public etapa$: Observable<any[]>;
  public membro: any;
  public endereco: any;
  public comboTipoContatos = [];
  public comboEscolaridade = []
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;
  public lista = [];
  public form: FormGroup;
  public formDate: FormGroup;

  

  ngOnInit() {
    this.getEmiter();
    this.columns();
    this._buildFormDate();
    this.getComboEtapaVisao();
    // console.log(JSON.parse(this.user.currentUser()));
    // console.log(JSON.parse(this.user.currentUser()).name);
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
      if (item.type == 'endereco') {
        this.endereco = item.data;
        // console.log(item.data)
      }
    });
  }

  pesquisar() {
    this.preencherObjeto();
    this.loading = true;
    this._membroService.pesquisar(this.membro).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.lista = item;
      this.dados = new MatTableDataSource(this.lista);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.loading = false;
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  preencherObjeto(): Membro {

    this.membro = new Membro();
    this.membro.nome = this.form.controls['nome'].value;
    this.membro.sobreNome = this.form.controls['sobrenome'].value;
    this.membro.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.membro.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.membro.sexo = this.form.controls['sexo'].value;
    this.membro.estadoCivil = this.form.controls['estadoCivil'].value;
    this.membro.dataNascimento = this.form.controls['dataNascimento'].value;
    this.membro.nacionalidade = this.form.controls['nacionalidade'].value;
    this.membro.profissao = this.form.controls['profissao'].value;
    this.membro.batizado = this.form.controls['batizado'].value;
    this.membro.dizimista = this.form.controls['dizimista'].value;
    this.membro.etapa = this.form.controls['etapa'].value;
    this.preencherPeriodos();

    if (this.endereco) {
      this.membro.endereco.cep = this.endereco.cep;
      this.membro.endereco.numero = this.endereco.numero;
      this.membro.endereco.complemento = this.endereco.complemento;
      this.membro.endereco.bairro = this.endereco.bairro;
      this.membro.endereco.logradouro = this.endereco.logradouro;
      this.membro.endereco.uf = this.endereco.uf;
      this.membro.endereco.localidade = this.endereco.cidade;
    }



    console.log(this.membro);
    return this.membro;
  }


  preencherPeriodos() {
    if (this.formDate.controls['dataInicioAt'].value && this.formDate.controls['dataFimAt'].value) {
      this.membro.dataCriacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioAt'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.membro.dataCriacaoFim = this._datePipe.transform(this.formDate.controls['dataFimAt'].value, 'yyyy-MM-dd') + " 23:59:59";
    }
    if (this.formDate.controls['dataInicioIn'].value && this.formDate.controls['dataFimIn'].value) {
      this.membro.dataInativacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioIn'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.membro.dataInativacaoFim = this._datePipe.transform(this.formDate.controls['dataFimIn'].value, 'yyyy-MM-dd') + " 23:59:59";
    }

  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNasciemento', value: 'Data Nascimento' },
      { id: 'rg', value: 'RG' },
      { id: 'cpf', value: 'CPF' },
      { id: 'estadoCivil', value: 'Estado Civil' },
      { id: 'sexo', value: 'Sexo' },
      { id: 'profissao', value: 'profissao' },
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
    this.lista.forEach(i => {
      dados.push({
        "Nome": i.nome,
        "Sobre nome": i.sobreNome,
        "Data Nascimento": i.dataNasciemento,
        "dataAtualizacao": i.descSituacaoHorario,
        "rg": i.rg,
        "cpf": i.cpf,
        "Estado Civil": i.estadoCivil,
        "Sexo Civil": i.sexo,
        "Profissao": i.profissao,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }


  getComboEtapaVisao() {
    this.etapa$ = this._etapaVisao.getList();
  }

  limpar(){
    this.form.reset();
    this.formDate.reset();
  }


}
