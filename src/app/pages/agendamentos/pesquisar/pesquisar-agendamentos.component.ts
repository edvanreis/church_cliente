import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { AgendamentoService } from '../../../service/agendamento.service';
import { take } from 'rxjs/operators';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-pesquisar-agendamentos',
  templateUrl: './pesquisar-agendamentos.component.html',
  styleUrls: ['./pesquisar-agendamentos.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class PesquisarAgendamentosComponent implements OnInit {
  public form: FormGroup;
  public date = new FormControl(moment().locale('pt-br'));
  public mesAno:any;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public dias = new Array();

  constructor(private _dateAdapter: DateAdapter<Date>,
    private _datePipe: DatePipe,
    private _service: AgendamentoService) { }

  ngOnInit() {
    this._buildForm();
    this.columns();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'dataSelecionada': new FormControl('', Validators.required)
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    console.log(this._datePipe.transform(this.date.value, 'MM/yyyy'));
  }


  getDias(mesAno) {
    mesAno = '01/'+mesAno;
    this._service.getDias(mesAno).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.dias = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  columns() {
    this.columnNames = [
      { id: 'data', value: 'Data' },
      { id: 'agendamento', value: 'agendamento' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

}
