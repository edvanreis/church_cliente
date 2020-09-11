import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../service/pedido.service';
import { NotifierService } from 'angular-notifier';
import { take, startWith, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker, MatAutocompleteSelectedEvent } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { IgrejaService } from '../../../service/igreja.service';
import { AlertType } from '../../../model/alert-type';



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
  selector: 'app-pesquisar',
  templateUrl: './pesquisar-pedido.component.html',
  styleUrls: ['./pesquisar-pedido.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PesquisarPedidoComponent implements OnInit {

  public pedidos = new Array();
  public competenciaSelecionada:any;
  public date = new FormControl(moment().locale('pt-br'));
  public myControl = new FormControl();
  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;

  constructor(private _service: PedidoService,
    private _notifierService: NotifierService,
    private _datePipe: DatePipe,
    private _igrejaService: IgrejaService) { }

    ngOnInit() {
      this.carregarIgrejas();
      this.competenciaSelecionada = this._datePipe.transform(this.date.value, 'MM/yyyy');
    }


    chosenYearHandler(normalizedYear: Moment) {
      const ctrlValue = this.date.value;
      if(ctrlValue){
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
      }
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
      this.competenciaSelecionada = this._datePipe.transform(this.date.value, 'MM/yyyy');
    }

  getList() {
    this._service.getList().pipe(take(1)).subscribe(item => {
      this.pedidos = item;
      console.log(this.pedidos);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  carregarIgrejas() {

    this._igrejaService.getList().pipe(take(1)).subscribe(item => {
      this.comboIgrejas = item;
      // console.log(item);
      this.filteredIgreja = this.myControlIgreja.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterIgreja(value, this.comboIgrejas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filterIgreja(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
  }
}
