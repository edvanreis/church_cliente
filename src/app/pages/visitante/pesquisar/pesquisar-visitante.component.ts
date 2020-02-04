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
import { Router } from '@angular/router';



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
    private _router: Router) { }

  public etapa$: Observable<any[]>;
  public visitante:any= {} as any;
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
  public visitantes:any = [];
  public form: FormGroup;
  public formDate: FormGroup;
  public dadosPessoais: any;
  public celula:any;

  

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
      'dataFimAt': new FormControl('')
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
    });
  }

  pesquisar() {
    this.setObj();
    console.log(this.visitante)
    this.loading = true;
    this._service.pesquisar(this.visitante).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.visitantes = item;
      this.dados = new MatTableDataSource(this.visitantes);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.loading = false;
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }





  setObj(){
    this.getEmiter();
    this.visitante.visitante = true;
    if(this.dadosPessoais){
      this.visitante.nome = this.dadosPessoais.nome;
      this.visitante.sobreNome = this.dadosPessoais.sobreNome;
      this.visitante.rg = this.dadosPessoais.rg;
      this.visitante.cpf = this.dadosPessoais.cpf;
      this.visitante.sexo = this.dadosPessoais.sexo;
      this.visitante.estadoCivil = this.dadosPessoais.estadoCivil;
      this.visitante.dataNascimento = this.dadosPessoais.dataNascimento;
      this.visitante.nacionalidade = this.dadosPessoais.nacionalidade;
      this.visitante.profissao = this.dadosPessoais.profissao;
      this.visitante.membro = false;
      
    }
    if(this.endereco){
      let enderecos:any = [];
      let endereco = {} as any
      endereco.cep = this.endereco.cep;
      endereco.numero = this.endereco.numero;
      endereco.complemento = this.endereco.complemento;
      endereco.bairro = this.endereco.bairro;
      endereco.logradouro = this.endereco.logradouro;
      endereco.uf = this.endereco.uf;
      endereco.localidade = this.endereco.localidade;
      enderecos.push(endereco);
      this.visitante.enderecos = enderecos;
    }

    if(this.celula){
      this.visitante.celula = this.celula;
    } 
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
    this.visitantes.forEach(i => {
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
    this.visitantes = [];
    this.formDate.reset();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('clear', '');
  }

  setFieldFormControl(field, value) {
    this.form.controls[field].patchValue(value)
  }

  editar(id){
    this._router.navigate(['/auth/visitante/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

}
