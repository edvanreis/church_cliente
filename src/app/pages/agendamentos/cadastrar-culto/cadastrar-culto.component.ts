import { DateAdapter } from '@angular/material/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { AgendamentoService } from '../../../service/agendamento.service';
import { take, startWith, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-cadastrar-culto',
  templateUrl: './cadastrar-culto.component.html',
  styleUrls: ['./cadastrar-culto.component.scss']
})
export class CadastrarCultoComponent implements OnInit {

  public form: FormGroup;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/];
  public igrejaId: any;
  public isEditar: boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public agendamentos = new Array();
  public loading: boolean = false;

  public comboIgrejas = new Array();
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaValue: any;
  public igrejaSelecionada: any;
  public data: any;

  public id;

  public maskDate = [/\d/, /\d/, '/',/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

  constructor(private _notifierService: NotifierService,
    private _service: AgendamentoService,
    private _datePipe: DatePipe,
    private _emitirEventoService: EmitirEventoService,
    private _igrejaService: IgrejaService,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this._buildForm();
    this.columns();
    this.carregarIgrejas();
    this.getEmiter();
    this.getParams();
  }


  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'horaInicio': new FormControl('', Validators.required),
      'horaFim': new FormControl('', Validators.required),
      'descricao': new FormControl(''),
      'dataAgendamento': new FormControl('', Validators.required),
      'qtdPessoas': new FormControl('', Validators.required),
    });
  }

  columns() {
    this.columnNames = [
      { id: 'dataAgendamento', value: 'Data do Agendamento' },
      { id: 'nome', value: 'Nome' },
      { id: 'horaInicio', value: 'Hora Inicio' },
      { id: 'horaFim', value: 'Hora Fim' },
      { id: 'qtdPessoas', value: 'Quantidade de Pessoas' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  validFieds(): boolean {
    if (!this.form.controls['nome'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor digite o nome do agendamento!");
      return false;
    }
    if (!this.form.controls['dataAgendamento'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione a Data de Inicio do agendamento!");
      return false;
    }

    if (!this.form.controls['qtdPessoas'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor Digite a quantidade de Pessoas!");
      return false;
    }
    if (!this.igrejaId && !this.igrejaSelecionada) {
      this._notifierService.notify(AlertType.Error, "Por favor selecone uma igreja!");
      return false;
    }
    return true;
  }

  adicionar(){
    if(!this.validFieds()){
      return;
    }
    this.loading = true;
    this._service.processarAgendamentoCulto(this.obj()).pipe(take(1)).subscribe(item => {
      // console.log(item)
      // if(!this.validarDataAgendamento(item)){
      //     this.loading = false;
      //     return;
      // }else{
        this.agendamentos.push(item);
        this.clear();
        this.dados = new MatTableDataSource(this.agendamentos);
        this.dados.sort = this.sort;
        this.dados.paginator = this.paginator;
        this.loading = false;
      // }
    }, error => {
      this.loading = false;
      console.log(error)
      this._notifierService.notify(AlertType.Error, error.error.message);

    });
  }

  validarDataAgendamento(item){
    // let agendamento = this.agendamentos.find(i=>i.dataAgendamento==item.dataAgendamento);
    // if(agendamento){
    //   this._notifierService.notify(AlertType.Error, "Data de agendamento já adicionada!");
    //   return false;
    // }else{
      return true;
    // }
  }

  clear(){
    this.form.reset();
    this.igrejaValue = '';
    this.igrejaSelecionada = null;
  }

  obj() {

    let agendamento = {} as any;
    agendamento.dataAgendamento = this.form.controls['dataAgendamento'].value;
    agendamento.nome = this.form.controls['nome'].value;
    agendamento.horaInicio = this.form.controls['horaInicio'].value;
    agendamento.horaFim = this.form.controls['horaFim'].value;
    agendamento.descricao = this.form.controls['descricao'].value;
    agendamento.qtdPessoas = this.form.controls['qtdPessoas'].value;
    agendamento.igreja = { id: this.getIgrejaId() };

    if(this.id){
      agendamento.id = this.id;
    }

    return agendamento;

  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'confirm-dialog-agendamento') {
        this.agendamentos.splice(item.data, 1);
        this.dados = new MatTableDataSource<Element>(this.agendamentos);
      }
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
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas!");
    });
  }

  private _filterIgreja(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionIgrejaChange($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
  }

  getIgrejaId() {
    if (this.igrejaId) {
      return this.igrejaId;
    } else if (this.igrejaSelecionada) {
      return this.igrejaSelecionada.id
    }
  }


  salvar() {
    if(this.agendamentos.length == 0){
      this._notifierService.notify(AlertType.Error, "Por favor adicione um agendamento!");
      return false;
    }
    this._service.saveListAgendamentos(this.agendamentos).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  voltar() {
    this._router.navigate(['/auth/agendamentos/pesquisar'], {
      queryParams: {
        pesquisar: 'pesquisar',
      },
      skipLocationChange: true
    });
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


  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap)
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.isEditar = true;
      this.getAgendamanto(this.id);

    }
    if (this._avRoute.snapshot.queryParamMap.get("igrejaId")) {
      this.igrejaId = this._avRoute.snapshot.queryParamMap.get("igrejaId");
    }

    if (this._avRoute.snapshot.queryParamMap.get("data")) {
      this.data = this._avRoute.snapshot.queryParamMap.get("data");
    }
  }

  getAgendamanto(id) {
    this._service.getAgendamento(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['horaInicio'].patchValue(item.horaInicio);
      this.form.controls['horaFim'].patchValue(item.horaFim);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['dataAgendamento'].patchValue(item.dataAgendamento);
      this.form.controls['qtdPessoas'].patchValue(item.qtdPessoas);

      if(item.igreja){
        this.igrejaSelecionada = item.igreja;
        this.igrejaValue = item.igreja.nome;
      }

    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  update() {
    if (!this.validFieds()) {
      return;
    }
    this._service.update(this.obj()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }
}
