import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MembroService } from '../../../service/membro.service';
import { ExcelService } from '../../../service/excel.service';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { AlertType } from '../../../model/alert-type';
import { PessoaService } from '../../../service/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-pesquisar-visitante',
  templateUrl: './pesquisar-visitante.component.html',
  styleUrls: ['./pesquisar-visitante.component.scss']
})
export class PesquisarVisitanteComponent implements OnInit {

  
  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: PessoaService,
    private _notifierService: NotifierService,
    private _excelService: ExcelService,
    private _datePipe: DatePipe,
    private _etapaVisao: EtapaVisaoService,
    private _router: Router,
    private _avRoute: ActivatedRoute) { }

  public etapa$: Observable<any[]>;
  public pessoa:any= {} as any;
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
  public pessoas:any = [];
  public form: FormGroup;
  public formDate: FormGroup;
  public dadosPessoais: any;
  public celula:any;

  

  ngOnInit() {
    this.getEmiter();
    this.columns();
    this._buildFormDate();
    this.getComboEtapaVisao();
    this.getParams();
    // console.log(JSON.parse(this.user.currentUser()));
    // console.log(JSON.parse(this.user.currentUser()).name);
  }


  getParams(){
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisa")) {
        this.pessoa = JSON.parse(localStorage.getItem("pesquisa"));
        localStorage.removeItem("pesquisa");
        this.pesquisar();
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
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
    });
  }

  pesquisar() {
    this.setObj();
    //  console.log(this.pessoa)
    this.loading = true;
    this._service.pesquisar(this.pessoa).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.pessoas = item;
      this.dados = new MatTableDataSource(this.pessoas);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.loading = false;
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }





  setObj(){
    this.getEmiter();
    this.pessoa.visitante = true;
    if(this.dadosPessoais){
      this.pessoa.nome = this.dadosPessoais.nome;
      this.pessoa.sobreNome = this.dadosPessoais.sobreNome;
      this.pessoa.rg = this.dadosPessoais.rg;
      this.pessoa.cpf = this.dadosPessoais.cpf;
      this.pessoa.sexo = this.dadosPessoais.sexo;
      this.pessoa.estadoCivil = this.dadosPessoais.estadoCivil;
      this.pessoa.dataNascimento = this.dadosPessoais.dataNascimento;
      this.pessoa.nacionalidade = this.dadosPessoais.nacionalidade;
      this.pessoa.profissao = this.dadosPessoais.profissao;
      this.pessoa.observacao = this.dadosPessoais.observacao;
      this.pessoa.membro = false;
      
    }
    if(this.enderecos){
      this.pessoa.enderecos = this.enderecos;
    }

    if(this.celula){
      this.pessoa.celula = this.celula;
    } 
    this.preencherPeriodos();
  }
  


  preencherPeriodos() {
    if (this.formDate.controls['dataInicioAt'].value && this.formDate.controls['dataFimAt'].value) {
      this.pessoa.dataCriacaoInicio = this._datePipe.transform(this.formDate.controls['dataInicioAt'].value, 'yyyy-MM-dd') + " 00:00:00";
      this.pessoa.dataCriacaoFim = this._datePipe.transform(this.formDate.controls['dataFimAt'].value, 'yyyy-MM-dd') + " 23:59:59";
    }

  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimentoFormatada', value: 'Data Nascimento' },
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
    this.pessoas.forEach(i => {
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
    this.setEmiter();
    this.pessoas = [];
    this.pessoa = {} as any;
    this.dadosPessoais = {} as any;
    this.formDate.reset();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('clear', '');
  }

  setFieldFormControl(field, value) {
    this.form.controls[field].patchValue(value)
  }

  editar(id){
    this.setObj();
    localStorage.setItem("pesquisa",JSON.stringify(this.pessoa));
    this._router.navigate(['/auth/visitante/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

}
