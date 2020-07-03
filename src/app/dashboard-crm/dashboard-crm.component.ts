import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { map, startWith, take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../model/alert-type';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

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
  @ViewChild('paginator') paginatorMembros: MatPaginator;


  tableData = [
    { country: 'India', sales: 5400, percentage: '40%' },
    { country: 'Us', sales: 3200, percentage: '30.33%' },
    { country: 'Australia', sales: 2233, percentage: '18.056%' },
    { country: 'Spaim', sales: 600, percentage: '6%' },
    { country: 'China', sales: 200, percentage: '4.50%' },
    { country: 'Brazil', sales: 100, percentage: '2.50%' },
  ];

  constructor(private _service: DashboardService,
    private _notifierService: NotifierService) { }

  ngOnInit() {
    this.carregarCardsTop();
    this.columnsMembros();
  }

  carregarCardsTop() {
    this._service.getDashCard().pipe(take(1)).subscribe(item => {
      console.log(item)
      this.cardsTop(item);
      this.tableMembrosPendentes(item.membrosPendentes);
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  cardsTop(item){
    this.dashCard = [
      { colorDark: '#5C6BC0', colorLight: '#7986CB', number: item.totalMembrosAprovados, title: 'Membros Aprovados', icon: 'person' },
      { colorDark: '#42A5F5', colorLight: '#64B5F6', number: item.totalMembrosPendentes, title: 'Membros Pendentes Aprovação', icon: 'person' },
    ];
  }

  tableMembrosPendentes(item){
    this.membrosPendentes = item;
    this.dadosMembros = new MatTableDataSource(item);
    this.dadosMembros.sort = this.sortMembros;
    this.dadosMembros.paginator = this.paginatorMembros;
  }

  columnsMembros() {
    this.columnNamesMembros = [
      { id: 'nome', value: 'Nome' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedMembrosColumns = this.columnNamesMembros.map(x => x.id);
  }
}
