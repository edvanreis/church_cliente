import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from '../../../model/alert-type';
import { DateAdapter, MatAutocompleteSelectedEvent, MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { GrupoService } from '../../../service/grupo.service';
import { take, startWith, map } from 'rxjs/operators';
import { PessoaService } from '../../../service/pessoa.service';
import { AgendamentoService } from '../../../service/agendamento.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-cadastrar-agendamentos',
  templateUrl: './cadastrar-agendamentos.component.html',
  styleUrls: ['./cadastrar-agendamentos.component.scss']
})
export class CadastrarAgendamentosComponent implements OnInit {

  public form: FormGroup;
  public formTwo: FormGroup;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/];
  public id: any;
  public igrejaId: any;
  public data: any;
  public myControlGrupos = new FormControl();
  public grupoSelecionado: any;
  public filteredGrupos: Observable<string[]>;
  public comboGrupos = [];
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public myControlMembro = new FormControl();
  public membroSelecionado: any;
  public membros = [];
  public processado: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public agendamentos = new Array();
  public loading: boolean = false;
  public isEditar: boolean = false;
  public grupoValue: any;
  public sizeLimitOne: boolean = true;
  public enderecos = [];

  constructor(private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _dateAdapter: DateAdapter<Date>,
    private _serviceGruop: GrupoService,
    private _pessoaService: PessoaService,
    private _service: AgendamentoService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getParams();
    this.columns();
    this.getEmiter();
    this._buildFormTow();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'horaInicio': new FormControl('', Validators.required),
      'horaFim': new FormControl('', Validators.required),
      'descricao': new FormControl('', Validators.required),
      'dataInicio': new FormControl('', Validators.required),
      'dataFim': new FormControl(''),
      'qtdDias': new FormControl(''),
      'dataAgendamento': new FormControl('', Validators.required),
    });
  }


  columns() {
    this.columnNames = [
      // { id: 'nome', value: 'Nome' },
      { id: 'dataAgendamento', value: 'Data do Agendamento' },
      { id: 'horaInicio', value: 'Hora Inicio' },
      { id: 'horaFim', value: 'Hora Fim' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getParams() {
    console.log(this._avRoute.snapshot.queryParamMap)
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.isEditar = true;
      this.getAgendamanto(this.id);

    }
    if (this._avRoute.snapshot.queryParamMap.get("igrejaId")) {
      this.igrejaId = this._avRoute.snapshot.queryParamMap.get("igrejaId");
      this.carregarGrupos();
      this.carregarMembro();
    }
    if (this._avRoute.snapshot.queryParamMap.get("data")) {
      this.data = this._avRoute.snapshot.queryParamMap.get("data");
    }
  }

  voltar() {
    this._router.navigate(['/auth/agendamentos/pesquisar'], {
      queryParams: {
        pesquisar: 'pesquisar',
      },
      skipLocationChange: true
    });
  }

  calcularDias() {
    if (!this.form.controls['dataInicio'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione a Data de Inicio do agendamento!");
    }
    let data = this.adicionarDiasData(this.form.controls['qtdDias'].value, this.form.controls['dataInicio'].value);
    this.form.controls['dataFim'].patchValue(this.transformDate(data));
  }

  adicionarDiasData(dias, dataInicio) {
    let dataVenc = new Date(dataInicio.getTime() + (dias * 24 * 60 * 60 * 1000) - 1);
    return dataVenc;
  }

  transformDate(data) {
    return this._datePipe.transform(data, 'dd/MM/yyyy ');
  }

  carregarGrupos() {
    this._serviceGruop.getGruposByIgrejas({ igreja: { id: this.igrejaId } }).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboGrupos = item;
      this.filteredGrupos = this.myControlGrupos.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGrupos(value, this.comboGrupos))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os grupos!");
    });
  }

  private _filterGrupos(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  onSelectionChangedGrupos($event: MatAutocompleteSelectedEvent, option) {
    this.grupoSelecionado = option;
  }

  carregarMembro() {
    this._pessoaService.getMembroIgreja(this.igrejaId).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembros(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembros(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
  }

  adicionarMembro() {
    if (!this.membroSelecionado) {
      console.log(this.membroSelecionado);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }

    let membroAdicionado = this.membros.find(i => i.nome == this.membroSelecionado.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membros.push(this.membroSelecionado);
  }

  processar() {
    if (!this.validFieds()) {
      return;
    }
    this.loading = true;
    this._service.processar(this.setObjToProcessar()).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.agendamentos = item;
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
      this.processado = true;
    }, error => {
      this.loading = false;
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  setObjToProcessar() {
    let agendamento = {} as any;
    agendamento.dataInicio = this._datePipe.transform(this.form.controls['dataInicio'].value, 'dd/MM/yyyy');
    agendamento.qtdDias = this.form.controls['qtdDias'].value;
    agendamento.horaInicio =  this.form.controls['horaInicio'].value;
    agendamento.horaFim =  this.form.controls['horaFim'].value;
    agendamento.descricao =  this.form.controls['descricao'].value;
    agendamento.nome =  this.form.controls['nome'].value;
    agendamento.igreja =  { id: this.igrejaId };

    if (this.membros.length > 0) {
      agendamento.pessoas = this.membros
    }
    if (this.grupoSelecionado) {
      agendamento.grupoTrabalho = { id: this.grupoSelecionado.id }
    }
    if (this.enderecos.length > 0) {
      agendamento.enderecos = this.enderecos
    }
    return agendamento;
  }

  setObjToUpdate() {
    let agendamento = {} as any;
    agendamento.dataAgendamento = this._datePipe.transform(this.form.controls['dataAgendamento'].value, 'dd/MM/yyyy');
      agendamento.horaInicio = this.form.controls['horaInicio'].value;
      agendamento.horaFim = this.form.controls['horaFim'].value;
      agendamento.descricao = this.form.controls['descricao'].value;
      agendamento.nome = this.form.controls['nome'].value;
      agendamento.igreja = { id: this.igrejaId };
      agendamento.id = this.id;

    if (this.membros.length > 0) {
      agendamento.pessoas = this.membros
    }
    if (this.grupoSelecionado) {
      agendamento.grupoTrabalho = { id: this.grupoSelecionado.id }
    }
    if (this.enderecos.length > 0) {
      agendamento.enderecos = this.enderecos
    }
    return agendamento;
  }


  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  dialogRemover(i, item) {
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        controller: 'agendamento',
        index: i,
        item: item
      }
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'confirm-dialog-agendamento') {
        this.agendamentos.splice(item.data, 1);
        this.dados = new MatTableDataSource<Element>(this.agendamentos);
      }
      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
    });
  }

  validFieds(): boolean {
    if (!this.form.controls['nome'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor digite o nome do agendamento!");
      return false;
    }
    if (!this.form.controls['descricao'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor escreva a descrição do agendamento");
      return false;
    }
    if (!this.form.controls['dataInicio'].value && !this.isEditar) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione a Data de Inicio do agendamento!");
      return false;
    }
    if (!this.form.controls['dataFim'].value && !this.isEditar) {
      this._notifierService.notify(AlertType.Error, "Por favor Data fim não pode esta vazia!");
      return false;
    }
    if (!this.form.controls['qtdDias'].value && !this.isEditar) {
      this._notifierService.notify(AlertType.Error, "Por favor digite a quantidade de dias!");
      return false;
    }
    if (!this.form.controls['dataAgendamento'].value && this.isEditar) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione a Data do agendamento!");
      return false;
    }
    if (!this.igrejaId) {
      this._notifierService.notify(AlertType.Error, "A igreja não pode ser null!");
      return false;
    }

    if (this.membros.length == 0 && !this.grupoSelecionado) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione os responsáveis pelo agendamento!");
      return false;
    }
    return true;
  }


  salvar() {
    this._service.saveListAgendamentos(this.agendamentos).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  update() {
    if (!this.validFieds()) {
      return;
    }
    this._service.update(this.setObjToUpdate()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  getAgendamanto(id) {
    this._service.getAgendamento(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['horaInicio'].patchValue(item.horaInicio);
      this.form.controls['horaFim'].patchValue(item.horaFim);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['dataAgendamento'].patchValue(new Date(item.dataAgendamentoToDate));
      if (item.pessoas) {
        this.membros = item.pessoas;
      }
      if (item.grupoTrabalho) {
        this.grupoSelecionado = item.grupoTrabalho;
        this.grupoValue = this.grupoSelecionado.nome;
      }
      if (item.enderecos && item.enderecos.length > 0) {
        this.enderecos = item.enderecos;
        this.formTwo.controls['outro'].patchValue(true);
        this.emitirEndereco(item.enderecos);
      }
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  emitirEndereco(item): void {
    this._emitirEventoService.emitir("edit-endereco", item);
  }

  private _buildFormTow(): void {
    this.formTwo = new FormGroup({
      'outro': new FormControl(false),
    });
  }

}
