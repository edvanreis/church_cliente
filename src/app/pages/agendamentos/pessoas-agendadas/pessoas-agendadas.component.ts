import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AgendamentoPessoaService } from '../../../service/agendamento-pessoa.service';
import { AgendamentoService } from '../../../service/agendamento.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { take, startWith, map } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../../../service/excel.service';
import { DialogJustificarAgendamentoComponent } from '../../dialog/dialog-justificar-agendamento/dialog-justificar-agendamento.component';

@Component({
  selector: 'app-pessoas-agendadas',
  templateUrl: './pessoas-agendadas.component.html',
  styleUrls: ['./pessoas-agendadas.component.scss']
})
export class PessoasAgendadasComponent implements OnInit {

  public igrejaSelecionada:any;
  public agendamentoSelecionado:any;

  public comboAgendamento = [];
  public myControlAgendamento = new FormControl();
  public filteredAgendamento: Observable<string[]>;

  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public pessoasAgendadas = new Array();

  public dashCard = [];

  constructor(private _service:AgendamentoPessoaService,
    private _serviceAgendamento:AgendamentoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _dialog: MatDialog) { }



  ngOnInit() {
    this.getEmiter();
    this.columns();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'nomeCompleto', value: 'Nome' },
      { id: 'dataNascimento', value: 'Data Nascimento' },
      { id: 'celular', value: 'Celular' },
      { id: 'id', value: 'Presente' },
      { id: 'justificar', value: 'Justificar' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.obterAgendamentos(this.igrejaSelecionada.id);
      }
      if(item.type=='confirm-dialog-justificar-agendamento'){
          this.getList(this.agendamentoSelecionado.id);
      }
    });
  }

  obterAgendamentos(id){
    this._serviceAgendamento.getAgendamentosIgreja(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.comboAgendamento = item;
      this.filteredAgendamento = this.myControlAgendamento.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterAgendamento(value, this.comboAgendamento))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os agendamentos!");
    });
  }

  private _filterAgendamento(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  getList(id) {
    this._service.pessoasAgendadas(id).pipe(take(1)).subscribe(item => {
      console.log(item)
      this.pessoasAgendadas = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      console.log(this.dados)
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  onSelectionClick($event: MatAutocompleteSelectedEvent, option) {
    this.agendamentoSelecionado = option;
    this.getList(this.agendamentoSelecionado.id);
    this.totalPessoasAgendadas(this.agendamentoSelecionado.id);
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  confirmar(id,bool){
    console.log(id,bool);
    let obj = {
      id:id,
      presente:bool
    }
    this._service.marcarPresentePessoa(obj).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this._notifierService.notify(AlertType.Success, item.value);
      this.totalPessoasAgendadas(this.agendamentoSelecionado.id);
      this.getList(this.agendamentoSelecionado.id);
    }, error => {
      // console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  totalPessoasAgendadas(id){
    this._service.totalPessoasAgendadas(id).pipe(take(1)).subscribe(item => {
      console.log(item)
      this.cardsTop(item)
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  cardsTop(item) {
    this.dashCard = [
      { colorDark: '#ff8000', colorLight: '#ffbf00', number: item.qtdTotalPessoas, title: 'Limite de pessoas', icon: 'warning' },
      { colorDark: '#66BB6A', colorLight: '#81C784', number: item.qtdTotalPessoasAgendamento, title: 'Total de Pessoas Agendadas', icon: 'check_circle_outline' },
      { colorDark: '#66BB6A', colorLight: '#81C784', number: item.totalPresentes, title: 'Presentes', icon: 'check_circle_outline' },
      { colorDark: '#26A69A', colorLight: '#4DB6AC', number: item.totalNaoPresentes, title: 'Não presentes', icon: 'group' },
    ];
  }

  exportAsXLSX() {
    let dados = [];
    this.pessoasAgendadas.forEach(i => {
      dados.push({
        "Nome": i.nomeCompleto,
        "Data Nascimento": i.dataNascimento,
        "Celular": i.celular,
        "Presente": i.presenteStr
      });
    });
    this._excelService.exportAsExcelFile(dados, "agendamentos");
  }


  dialogJustificar(id){
      const dialogRef = this._dialog.open(DialogJustificarAgendamentoComponent, {
        width: '600px',
        data: {
          id: id,
        }
      });
  }

}
