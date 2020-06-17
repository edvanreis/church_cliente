import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatDialog, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReuniaoService } from '../../../service/reuniao.service';
import { CelulaService } from '../../../service/celula.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { HelperChurch } from '../../../helper/helper.church';
import { DialogConfirmReuniaoComponent } from '../../dialog/dialog-confirm-reuniao/dialog-confirm-reuniao.component';
import { LicaoService } from '../../../service/licao.service';

@Component({
  selector: 'app-pesquisar-reuniao',
  templateUrl: './pesquisar-reuniao-celula.component.html',
  styleUrls: ['./pesquisar-reuniao-celula.component.scss']
})
export class PesquisarReuniaoCelulaComponent implements OnInit {

  public maskCompetencia = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public form: FormGroup;
  public celulaSelecionada: any;
  public licaoSelecionada: any;
  public comboSemana = [];
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public reunioes = [];
  public reuniao = {} as any;
  public loading: boolean = false;

  constructor(private _router: Router,
    private _service: ReuniaoService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute,
    private _celulaService: CelulaService,
    private _licaoService: LicaoService) { }



  ngOnInit() {
    this._buildForm();
    this.getComboSemana();
    this.getEmiter();
    this.columns();
    this.getParams();
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/reuniao/cadastrar-reuniao-celula'], {
      queryParams: {
        janela: 'Nova',
      },
      skipLocationChange: true
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'competencia': new FormControl(''),
      'diaDaSemana': new FormControl('')
    });
  }

  getComboSemana() {
    this._celulaService.carregarSemana().subscribe(item => {
      this.comboSemana = item;
      // console.log(item);
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'celula-comp') {
        this.celulaSelecionada = item.data;
      }
      if (item.type == 'licao-comp') {
        this.licaoSelecionada = item.data;
      }
      if (item.type == 'confirm-dialog-reuniao') {
        this.pesquisar();
      }

    });
  }

  columns() {
    this.columnNames = [
      { id: 'celulaNome', value: 'Célula' },
      { id: 'competencia', value: 'Competência' },
      { id: 'diaDaSemanaDesc', value: 'Dia da semana' },
      { id: 'dataDaReuniao', value: 'Data da reunião' },
      { id: 'cep', value: 'CEP' },
      { id: 'logradouro', value: 'Logradouro' },
      { id: 'numero', value: 'Número' },
      { id: 'bairro', value: 'Bairro' },
      { id: 'localidade', value: 'Localidade' },
      { id: 'uf', value: 'Estado' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  pesquisar() {
    this.setObj();

    if (!this.validFields()) {
      return;
    }
    this.loading = true;
    this._service.search(this.reuniao).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.reunioes = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
      this.loading = false;
    });
  }

  setObj() {
    this.reuniao.competencia = HelperChurch.isNull(this.form.controls['competencia'].value);
    this.reuniao.diaDaSemana = HelperChurch.isNull(this.form.controls['diaDaSemana'].value);

    if (this.celulaSelecionada) {
      this.reuniao.celula = { id: this.celulaSelecionada.id };
    }

    if (this.licaoSelecionada) {
      this.reuniao.licao = { id: this.licaoSelecionada.id };
    }
  }

  validFields(): boolean {
    if (!this.reuniao.competencia
      && !this.reuniao.diaDaSemana
      && !this.reuniao.celula
      && !this.reuniao.licao) {
      this._notifierService.notify(AlertType.Error, "Por favor utilize alguns dos filtros");
      return false;
    } else {
      return true;
    }
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  exportAsXLSX() {
    let dados = [];
    this.reunioes.forEach(i => {
      dados.push({
        "Célula": i.celulaNome,
        "Competência": i.competencia,
        "Dia da semana": i.diaDaSemanaDesc,
        "Data da reunião'": i.dataDaReuniao,
        "CEP": i.cep,
        "Logradouro": i.logradouro,
        "Número": i.numero,
        "Bairro": i.bairro,
        "Localidade": i.localidade,
        "Estado": i.uf,
      });
    });

    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }

  dialogRemover(id) {
    // console.log(id)
    localStorage.setItem("pesquisa", JSON.stringify(this.reuniao));
    const dialogRef = this._dialog.open(DialogConfirmReuniaoComponent, {
      width: '600px',
      data: {
        id: id,
      }
    });
  }

  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisa")) {
      this.reuniao = JSON.parse(localStorage.getItem("pesquisa"));
      localStorage.removeItem("pesquisa");
      this.form.controls['competencia'].patchValue(this.reuniao.competencia);
      this.form.controls['diaDaSemana'].patchValue(this.reuniao.diaDaSemana);
      if(this.reuniao.celula){
        this.getCelula(this.reuniao.celula.id);
      }
      if(this.reuniao.licao){
        this.getLicao(this.reuniao.licao.id);
      }
      this.pesquisar();
    }
  }

  editar(id) {
    this.setObj();
    localStorage.setItem("pesquisa", JSON.stringify(this.reuniao));
    this._router.navigate(['/auth/reuniao/cadastrar-reuniao-celula'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  emitirCelula(item): void {
    this._emitirEventoService.emitir('edit-celula', item);
  }
  emitirLicao(item): void {
    this._emitirEventoService.emitir('edit-licao', item);
  }

  getCelula(id) {
    this._celulaService.getCelula(id).pipe(take(1)).subscribe(item => {
      this.emitirCelula(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  getLicao(id) {
    this._licaoService.getLicao(id).pipe(take(1)).subscribe(item => {
      this.emitirLicao(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as lições!");
    });
  }

  relatorioReuniaoSemanal(id) {
    this._service.relatorioReniaoSemanal(id)
      .subscribe(item => {
        const url = window.URL.createObjectURL(item);
        const type = item.type.split("/");
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = "relatorio_reuniao_semanal" + "." + type[1];
        a.click();
      }, error => {
        console.log(error)
        this._notifierService.notify(AlertType.Error, "Arquivo não localizado!");
      });
  }







}
