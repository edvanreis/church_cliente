import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { MembroService } from '../../../../service/membro.service';
import { Membro } from '../../../../model/membro';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../../model/alert-type';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../../../../service/excel.service';


@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService, 
              private _membroService: MembroService,
              private _notifierService: NotifierService,
              private _excelService: ExcelService) { }

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

  ngOnInit() {
    // this.setEmiter();
    this.getEmiter();
    this.columns();
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      } else if (item.type == 'endereco') {
        this.endereco = item.data;
        console.log(item.data)
      }

    });
  }

  pesquisar() {
    this.preencherObjeto();
    this.loading = true;
    this._membroService.pesquisar(this.membro).pipe(take(1)).subscribe(item => {
      console.log(item);
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
      this.membro.nome = this.dadosPessoais.nome;
      this.membro.sobreNome = this.dadosPessoais.sobreNome;
      this.membro.rg = this.dadosPessoais.rg;
      this.membro.cpf = this.dadosPessoais.cpf;
      this.membro.sexo = this.dadosPessoais.sexo;
      this.membro.estadoCivil = this.dadosPessoais.estadoCivil;
      this.membro.dataNascimento = this.dadosPessoais.dataNascimento;
      this.membro.idCelula = this.dadosPessoais.idCelula;
      this.membro.nacionalidade = this.dadosPessoais.nacionalidade;
      this.membro.profissao = this.dadosPessoais.profissao;
      this.membro.batizado = this.dadosPessoais.batizado;
      this.membro.dizimista = this.dadosPessoais.dizimista;
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


}
