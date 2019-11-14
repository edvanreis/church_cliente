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


@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService, 
              private _membroService: MembroService,
              private _notifierService: NotifierService,
              private _excelService: ExcelService,) { }

  public membro: any;
  public dadosPessoais: any;
  public endereco: any;
  public comboTipoContatos = [];
  public comboEscolaridade = []
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading:boolean = false;
  public lista = [];
  public form: FormGroup;
  public comboSexo = [];
  public comboEstadoCivil = [];

  ngOnInit() {
    this.getEmiter();
    this.columns();
    this._buildForm();
    this.getComboSexo();
    this.getComboEstadoCivil();
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
      'batizado': new FormControl(''),
      'dizimista': new FormControl(''),
      'celula': new FormControl(''),
    });
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      } else if (item.type == 'endereco') {
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
    if (this.dadosPessoais) {
      this.membro.nome = this.form.controls['nome'].value;
      this.membro.sobreNome = this.form.controls['sobreNome'].value;
      this.membro.rg =this.form.controls['rg'].value;
      this.membro.cpf = this.dadosPessoais.cpf;
      this.membro.sexo = this.form.controls['sexo'].value;
      this.membro.estadoCivil = this.form.controls['estadoCivil'].value;
      this.membro.dataNascimento = this.form.controls['dataNascimento'].value;
      this.membro.idCelula = this.form.controls['idCelula'].value;
      this.membro.nacionalidade = this.form.controls['nacionalidade'].value;
      this.membro.profissao =this.form.controls['profissao'].value;
      this.membro.batizado = this.form.controls['batizado'].value;
      this.membro.dizimista =this.form.controls['dizimista'].value;
    }
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

  
  columns() {
    this.columnNames = [
      { id: 'nome', value: 'Nome' },
      { id: 'sobreNome', value: 'Sobre Nome' },
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

  getComboSexo() {
    this._membroService.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._membroService.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      console.log(item);
    });
  }


}
