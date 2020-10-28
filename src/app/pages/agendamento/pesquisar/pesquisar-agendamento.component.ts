import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { HelperChurch } from '../../../helper/helper.church';
import { AlertType } from '../../../model/alert-type';
import { AgendamentoPessoaService } from '../../../service/agendamento-pessoa.service';

@Component({
  selector: 'app-pesquisar-agendamento',
  templateUrl: './pesquisar-agendamento.component.html',
  styleUrls: ['./pesquisar-agendamento.component.scss']
})
export class PesquisarAgendamentoComponent implements OnInit {

  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cpf: string;

  public agendamentos = new Array();
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;

  constructor(private _service: AgendamentoPessoaService,
    private _notifierService: NotifierService,
    private _router: Router) { }

  ngOnInit() {
    this.columns();
  }

  columns() {
    this.columnNames = [
      { id: 'dataAgendamento', value: 'Data Agendamento' },
      { id: 'nome', value: 'Nome' },
      { id: 'horaInicio', value: 'Inicio' },
      { id: 'horaFim', value: 'Fim' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  pesquisar() {
    if (!this.cpf) {
      this._notifierService.notify(AlertType.Error, "Por favor digite o CPF!");
      return false;
    }
    this.loading = true;
    this.cpf = HelperChurch.retirarFormatacao(this.cpf);
    this._service.getAgendamentosPessoa(this.cpf).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.agendamentos = item;
      this.dados = new MatTableDataSource(this.agendamentos);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.agendamentos = [];
      this.dados = new MatTableDataSource<Element>(this.agendamentos);
      this._notifierService.notify(AlertType.Error, error.error.message);

    });

  }

  voltar() {
    this._router.navigate(['/']);
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

}
