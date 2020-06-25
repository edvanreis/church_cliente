import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { AgendamentoService } from '../../../service/agendamento.service';
import { MatSort, MatTableDataSource, MatPaginator, MatAutocompleteSelectedEvent } from '@angular/material';
import { IgrejaService } from '../../../service/igreja.service';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { Router, ActivatedRoute } from '@angular/router';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

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
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public agendamentos = new Array();
  public myControl = new FormControl();
  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaValue: any;
  public statusValue: any;
  public igrejaSelecionada: any;
  public competenciaSelecionada:any;



  constructor(private _dateAdapter: DateAdapter<Date>,
    private _datePipe: DatePipe,
    private _service: AgendamentoService,
    private _igrejaService: IgrejaService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.carregarIgrejas();
    this.competenciaSelecionada = this._datePipe.transform(this.date.value, 'MM/yyyy');
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'dataSelecionada': new FormControl('', Validators.required)
    });
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
    this.getDias();
  }


  getDias() {
    let obj = {
      dataAgendamento:"01/"+this.competenciaSelecionada,
      igreja:{id:this.igrejaSelecionada.id}
    }
    this._service.getDias(obj).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.agendamentos = item;
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

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
    this.getDias();
  }

naoExisteAgendamento(e):boolean{
  let array = [];
  e.value.forEach(element => {
    if(element.id){
      array.push(element);
    }
  });
  return array.length == 0;
}

cadastrar(data) {
  this._router.navigate(['/auth/agendamentos/cadastrar'], {
    queryParams: {
      igrejaId: this.igrejaSelecionada.id,
      data:data
    },
    skipLocationChange: true
  });
}




}
