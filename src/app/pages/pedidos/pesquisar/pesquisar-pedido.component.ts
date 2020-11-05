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
import { identifierName } from '@angular/compiler';



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
  public pedidosAtendidos:any;
  public pedidosPendentes:any;
  public totPedidos:any;
  public dashCard = [];

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

  pesquisar() {

    if(!this.competenciaSelecionada){
      this._notifierService.notify(AlertType.Error, "Por favor selecone uma competência");
      return false;
    }

    if(!this.igrejaSelecionada){
      this._notifierService.notify(AlertType.Error, "Por favor selecone uma Igreja!");
      return false;
    }

    let pedidos = {} as any;
    pedidos.competencia = this.competenciaSelecionada;
    pedidos.igreja = {id:this.igrejaSelecionada.id};

    this._service.obterPedidos(pedidos).pipe(take(1)).subscribe(item => {
      this.pedidos = item;
      // console.log(this.pedidos);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
    this.totalPedidos(pedidos);
  }

  totalPedidos(pedidos){
    this._service.totalPedidos(pedidos).pipe(take(1)).subscribe(item => {
      this.cardsTop(item)
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  carregarIgrejas() {

    this._igrejaService.getListDashBoard().pipe(take(1)).subscribe(item => {
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

 atendido(id){
  this._service.atendido(id).pipe(take(1)).subscribe(item => {
    this.pesquisar();
    this._notifierService.notify(AlertType.Success, item.value);
  }, error => {
    this._notifierService.notify(AlertType.Error, error.message);
  });
}

remover(id){
  this._service.remove(id).pipe(take(1)).subscribe(item => {
    this.pesquisar();
    this._notifierService.notify(AlertType.Success, item.value);
  }, error => {
    this._notifierService.notify(AlertType.Error, error.message);
  });
}

cardsTop(item) {
  this.dashCard = [
    { colorDark: '#ff8000', colorLight: '#ffbf00', number: item.totalPedidosPendentes, title: 'Pedidos Pendentes', icon: 'warning' },
    { colorDark: '#66BB6A', colorLight: '#81C784', number: item.totalPedidosAtendidos, title: 'Pedidos Atendidos', icon: 'check_circle_outline' },
    { colorDark: '#42A5F5', colorLight: '#64B5F6', number: item.totalPedidosPendentes+item.totalPedidosAtendidos, title: 'Total de Pedidos', icon: 'person' },
  ];
}

}
