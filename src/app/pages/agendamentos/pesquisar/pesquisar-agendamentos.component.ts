import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialog, MatPaginator } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { AgendamentoService } from '../../../service/agendamento.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { IgrejaService } from '../../../service/igreja.service';
import { DialogAprovarReprovarAgendamentoComponent } from '../../dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.component';
import { DialogConfirmAgandamentoComponent } from '../../dialog/dialog-confirm-agandamento/dialog-confirm-agandamento.component';

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
  public competencia:any;



  constructor(private _dateAdapter: DateAdapter<Date>,
    private _datePipe: DatePipe,
    private _service: AgendamentoService,
    private _igrejaService: IgrejaService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog,
    private _excelService: ExcelService) { }

  ngOnInit() {
    this.carregarIgrejas();
    this.competenciaSelecionada = this._datePipe.transform(this.date.value, 'MM/yyyy');
    this.getParams();
    this.getEmiter();
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
    if(this.igrejaSelecionada){
      this.pesquisar();
    }

  }


  pesquisar() {
    if(!this.igrejaSelecionada){
      this._notifierService.notify(AlertType.Error, "Por favor selecione uma igreja!");
    }

    this._service.getDias(this.obj()).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.agendamentos = item;
    }, error => {
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  obj(){
    return {
      dataAgendamento:"01/"+this.competenciaSelecionada,
      igreja:{id:this.igrejaSelecionada.id}
    }
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

existeAgendamento(e):boolean{
  let possui:boolean = false;
  // console.log(e);
  e.value.forEach(element => {
    if(element.possuiAgendamento){
      possui =  true;
    }
  });
  return possui;
}

cadastrar() {
  localStorage.setItem("pesquisar", JSON.stringify(this.setObj()));
  this._router.navigate(['/auth/agendamentos/cadastrar'], {
    queryParams: {
      igrejaId: this.igrejaSelecionada?this.igrejaSelecionada.id:null,
    },
    skipLocationChange: true
  });
}

cadastrarCulto() {
  localStorage.setItem("pesquisar", JSON.stringify(this.setObj()));
  this._router.navigate(['/auth/agendamentos/cadastrar-culto'], {
    queryParams: {
      igrejaId: this.igrejaSelecionada?this.igrejaSelecionada.id:null,
    },
    skipLocationChange: true
  });
}

editar(id,tipo) {
  localStorage.setItem("pesquisar", JSON.stringify(this.setObj()));
  let rota = '';
  if(tipo=='C'){
    rota = '/auth/agendamentos/cadastrar-culto';
  }else{
    rota = '/auth/agendamentos/cadastrar';
  }

  this._router.navigate([rota], {
    queryParams: {
      igrejaId: this.igrejaSelecionada.id,
      id:id
    },
    skipLocationChange: true
  });

}

setObj(){
  return {
    competenciaSelecionada: this.competenciaSelecionada,
    igrejaSelecionada:this.igrejaSelecionada
  }
}

getParams(): boolean {
   console.log(this._avRoute.snapshot.queryParamMap);
  if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
    let obj  = JSON.parse(localStorage.getItem("pesquisar"));

    if(obj.competenciaSelecionada){
      this.competenciaSelecionada = obj.competenciaSelecionada;
      // this.date.patchValue(new Date(this.competenciaSelecionada ));
    }
    if(obj.igrejaSelecionada){
      this.igrejaSelecionada = obj.igrejaSelecionada;
      this.igrejaValue = this.igrejaSelecionada.nome;
    }
    localStorage.removeItem("pesquisar");
    if(!this.igrejaSelecionada){
      return false;
    }
    this.pesquisar();
    return true;
  } else {
    return false;
  }
}

dialogAprovar(id) {
  const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
    width: '600px',
    data: {
      id: id,
      aprovar: true,
      reprovar: false,
      cancelar:false
    }
  });
}

dialogReprovar(id) {
  const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
    width: '600px',
    data: {
      id: id,
      aprovar: false,
      reprovar: true,
      cancelar:false
    }
  });
}

dialogCancelar(id) {
  const dialogRef = this._dialog.open(DialogAprovarReprovarAgendamentoComponent, {
    width: '600px',
    data: {
      id: id,
      aprovar: false,
      reprovar: false,
      cancelar:true
    }
  });
}

dialogRemover(id) {
  const dialogRef = this._dialog.open(DialogConfirmAgandamentoComponent, {
    width: '600px',
    data: {
      id: id,
    }
  });
}

getEmiter(): void {
  this._emitirEventoService.mensagem.subscribe(item => {
    if (item.type == 'dialog-aprovar-reprovar-agendamento') {
      this.pesquisar();
    }
      if (item.type == 'confirm-dialog-remover-agendamento') {
        this.pesquisar();
      }
  });
}

exportAsXLSX() {
  let agendamentos = [];
  let dados = []

  this._service.obterAgendamentosMes(this.obj()).pipe(take(1)).subscribe(item => {
    agendamentos = item;
    agendamentos.forEach(i => {
    dados.push({
      "Data do Agendamento": i.dataAgendamento,
      "Hora Inicio": i.horaInicio,
      "Hora Fim": i.horaFim,
      "Nome": i.nome,
      "Situação": i.statusAgendamento,
      "Data Criação":i.dataCriacao
    });
  });
  this._excelService.exportAsExcelFile(dados, "agendamentos");
  }, error => {
    this._notifierService.notify(AlertType.Error, error.errors.message);

  });

}


}
