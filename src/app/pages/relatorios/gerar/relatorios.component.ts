import { Component, OnInit } from '@angular/core';
import { CelulaService } from '../../../service/celula.service';
import { take, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, DateAdapter } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { PessoaService } from '../../../service/pessoa.service';
import { RelatoriosService } from '../../../service/relatorios.service';
import { HelperChurch } from '../../../helper/helper.church';
import { DatePipe } from '@angular/common';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatorioComponent implements OnInit {

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public comboCelulas = [];
  public celulaSelecionada: any;
  public membroSelecionado: any;
  public myControlMembro = new FormControl();
  public filteredMembro: Observable<string[]>;
  public comboMembro = [];
  public relatorios$: Observable<any[]>;
  public relatorioSelecionado: any;
  public form: FormGroup;
  public maskCompetencia = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public showDateReuniao: boolean = false;
  public loading: boolean = false;
  public showMultSelectCelula: boolean = false;
  public checkedList = [];
  public celulasId = [];

  constructor(private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _pessoaService: PessoaService,
    private _service: RelatoriosService,
    private _dateAdapter: DateAdapter<Date>,
    private _datePipe: DatePipe,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getComboRelatorios();
    this.carregarCelula();
    this.getEmiter();
  }

  getComboRelatorios() {
    this.relatorios$ = this._service.getList();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'relatorios': new FormControl('', Validators.required),
      'dataDaReuniao': new FormControl('', Validators.required),
      'competencia': new FormControl('', Validators.required),
    });
  }


  carregarCelula() {

    this._celulaService.getList().pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
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
    this.carregarMembro(this.celulaSelecionada.id);
  }

  onSelectionMembroChange($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
  }


  carregarMembro(id) {
    this._pessoaService.getMembroCelula(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembro(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionClick(element) {
    // console.log(element);
    this.relatorioSelecionado = element.nome;
    if (this.relatorioSelecionado === 'Relatório reunião semanal') {
      this.showDateReuniao = true;
    } else {
      this.showDateReuniao = false;
    }
    if (this.relatorioSelecionado === 'Relatório de faltas') {
      this.showMultSelectCelula = true;
    } else {
      this.showMultSelectCelula = false;
    }
  }

  validFields(): boolean {
    if ((!this.celulaSelecionada && !this.showMultSelectCelula) || (this.checkedList.length == 0 && this.showMultSelectCelula) ) {
      this._notifierService.notify(AlertType.Error, 'Selecione pelo menos uma célula!');
      return false;
    }
    if (this.showDateReuniao && !this.form.controls['dataDaReuniao'].value) {
      this._notifierService.notify(AlertType.Error, "Selecione a data da reunião!");
      return false;
    }
    if (!this.showDateReuniao && !this.form.controls['competencia'].value) {
      this._notifierService.notify(AlertType.Error, "Digite a competencia do relatório");
      return false;
    }
    return true;
  }

  gerar() {
    if (!this.validFields()) {
      return;
    }
    switch (this.relatorioSelecionado) {
      case 'Relatório reunião semanal':
        this.gerarRelatorioSemanalCelula();
        break;
      case 'Relatório de faltas':
        this.gerarRelatorioFaltas();
        break;
      default:
        break;
    }
  }

  setObj() {
    return {
      celulaId: this.celulaSelecionada ? this.celulaSelecionada.id : null,
      pessoaId: this.membroSelecionado ? this.membroSelecionado.id : null,
      competencia: HelperChurch.isNull(this.form.controls['competencia'].value),
      dataDaReuniao: this.getDateReuniao(),
      celulas:this.checkedList
    }
  }

  blurCelula(event) {
    if (!event.target.value) {
      this.celulaSelecionada = null;
    }
  }

  getDateReuniao() {
    if (!this.form.controls['dataDaReuniao'].value) {
      return null;
    } else {
      return this._datePipe.transform(this.form.controls['dataDaReuniao'].value, 'dd/MM/yyyy');
    }
  }


  gerarRelatorioSemanalCelula() {
    this.loading = true;
    this._service.relatorioReniaoSemanal(this.setObj()).pipe(take(1)).subscribe(item => {
        const url = window.URL.createObjectURL(item);
        const type = item.type.split("/");
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.download = "relatorio_reuniao_semanal_celula" + "." + type[1];
        a.click();
        this.loading = false;
      }, error => {
        // console.log(error)
        this.loading = false;
        this._notifierService.notify(AlertType.Error, "Arquivo não localizado!");
      });
  }

  gerarRelatorioFaltas() {
    this.loading = true;
    let dados = [];
    this._service.relatorioFaltas(this.setObj()).pipe(take(1)).subscribe(item => {
      this.loading = false;
      item.forEach(i => {
        dados.push({
          "Data da Reunião": i.dataDaReuniao,
          "Nome": i.nome,
          "Célula": i.celula
        });
      });
      this._excelService.exportAsExcelFile(dados, "membros");
      }, error => {
        this.loading = false;
        this._notifierService.notify(AlertType.Error, "Arquivo não localizado!");
      });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.type == 'mult-select-celulas') {
        this.checkedList = obj.data;
        console.log(this.checkedList);
        this.carregarMembroCelulas(this.checkedList);
      }
    });
  }

  carregarMembroCelulas(checkedList) {
    this._pessoaService.getMembroCelulas(checkedList).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

}
