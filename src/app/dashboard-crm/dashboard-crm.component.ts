import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../model/alert-type';
import { DialogAprovarReprovarAgendamentoComponent } from '../pages/dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.component';
import { AgendamentoService } from '../service/agendamento.service';
import { DashboardService } from '../service/dashboard.service';
import { DialogConfirmComponent } from '../pages/dialog/dialog-confirm/dialog-confirm.component';
import { EmitirEventoService } from '../service/emitir-evento.service';

@Component({
  selector: 'app-dashboard-crm',
  templateUrl: './dashboard-crm.component.html',
  styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

  // public dashCard = [
  //   { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 1221, title: 'SALES', icon: 'local_grocery_store' },
  //   { colorDark: '#42A5F5', colorLight: '#64B5F6', number: 1221, title: ' ', icon: 'new_releases' },
  //   { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 1221, title: 'ASSETS', icon: 'assignments' },
  //   { colorDark: '#66BB6A', colorLight: '#81C784', number: 1221, title: 'BANKING', icon: 'account_balance' }
  // ];

  public dashCard = [];
  public membrosPendentes = [];
  @ViewChild(MatSort) sortMembros: MatSort;
  public displayedMembrosColumns: string[] = [];
  public columnNamesMembros;
  public dadosMembros = new MatTableDataSource();
  @ViewChild('paginatorMembro') paginatorMembros: MatPaginator;

  public agendamentosPendentes = [];
  @ViewChild(MatSort) sortAgendamentos: MatSort;
  public displayedAgendamentosColumns: string[] = [];
  public columnNamesAgendamntos;
  public dadosAgendamentos = new MatTableDataSource();
  @ViewChild('paginatorAgendamento') paginatorAgendamentos: MatPaginator;


  tableData = [
    { country: 'India', sales: 5400, percentage: '40%' },
    { country: 'Us', sales: 3200, percentage: '30.33%' },
    { country: 'Australia', sales: 2233, percentage: '18.056%' },
    { country: 'Spaim', sales: 600, percentage: '6%' },
    { country: 'China', sales: 200, percentage: '4.50%' },
    { country: 'Brazil', sales: 100, percentage: '2.50%' },
  ];

  constructor(private _service: DashboardService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarCardsTop();
    this.columnsMembros();
    this.columnsAgendamentos();
    this.getEmiter();
  }

  carregarCardsTop() {
    this._service.getDashCard().pipe(take(1)).subscribe(item => {
      console.log(item)
      this.cardsTop(item);
      this.tableMembrosPendentes(item.membrosPendentes);
      this.tableAgendamentosPendentes(item.agendamentosPendentes);
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  cardsTop(item){
    this.dashCard = [
      { colorDark: '#ff8000', colorLight: '#ffbf00', number: item.totalMembrosPendentes, title: 'Membros Pendentes Aprovação', icon: 'warning' },
      { colorDark: '#ff8000', colorLight: '#ffbf00', number: item.totalAgendamentosPendentes, title: 'Agendamentos Pendentes Aprovação', icon: 'warning' },
      { colorDark: '#66BB6A', colorLight: '#81C784', number: item.totalMembrosAprovados, title: 'Membros', icon: 'person' },
      { colorDark: '#42A5F5', colorLight: '#64B5F6', number: item.totalIgrejas, title: 'Igrejas', icon: 'location_city' },
      { colorDark: '#26A69A', colorLight: '#4DB6AC', title: 'Redes', icon: 'device_hub' },
      { colorDark: '#26A69A', colorLight: '#4DB6AC', number: item.totalGruposTrabalho, title: 'Grupo de trabalho', icon: 'work' },

    ];
    if(item.totalCelulas > 0 ){
      this.dashCard.push( { colorDark: '#26A69A', colorLight: '#4DB6AC', number: item.totalCelulas, title: 'Células', icon: 'group' },)
    }
  }

  tableMembrosPendentes(item){
    this.membrosPendentes = item;
    this.dadosMembros = new MatTableDataSource(item);
    this.dadosMembros.sort = this.sortMembros;
    this.dadosMembros.paginator = this.paginatorMembros;
  }

  tableAgendamentosPendentes(item){
    this.agendamentosPendentes = item;
    this.dadosAgendamentos = new MatTableDataSource(item);
    this.dadosAgendamentos.sort = this.sortAgendamentos;
    this.dadosAgendamentos.paginator = this.paginatorAgendamentos;
  }

  columnsMembros() {
    this.columnNamesMembros = [
      { id: 'nome', value: 'Nome' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedMembrosColumns = this.columnNamesMembros.map(x => x.id);
  }

  columnsAgendamentos() {
    this.columnNamesAgendamntos = [
      { id: 'dataAgendamento', value: 'Data Agendamento' },
      { id: 'nome', value: 'Nome' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedAgendamentosColumns = this.columnNamesAgendamntos.map(x => x.id);
  }

  applyFilterMembros(value) {
    this.dadosMembros.filter = value.trim().toLowerCase();
  }

  applyFilterAgendamentos(value) {
    this.dadosAgendamentos.filter = value.trim().toLowerCase();
  }

  dialogAprovarAgendamento(id) {
    const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
      width: '600px',
      data: {
        id: id,
        aprovar:true,
        reprovar:false,
      }
    });
  }

  dialogReprovarAgendamento(id) {
    const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
      width: '600px',
      data: {
        id: id,
        aprovar:false,
        reprovar:true,
      }
    });
  }

  dialogAprovarMembro(id) {
    const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
      width: '600px',
      data: {
        id: id,
        aprovar:true,
        reprovar:false,
      }
    });
  }
  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'dialog-aprovar-reprovar-agendamento') {
        this.carregarCardsTop();
      }
    });
  }


}
