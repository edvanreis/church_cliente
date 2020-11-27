import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { HelperChurch } from '../../../helper/helper.church';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MembroService } from '../../../service/membro.service';
import { RedeService } from '../../../service/rede.service';
import { ReuniaoCelulaService } from '../../../service/reuniao-celula.service';
import { DialogConfirmPessoaReuniaoComponent } from '../../dialog/dialog-confirm-pessoa-reuniao/dialog-confirm-pessoa-reuniao.component';
import { VisitanteService } from './../../../service/visitante.service';

@Component({
  selector: 'app-cadastrar-reuniao-celula',
  templateUrl: './cadastrar-reuniao-celula.component.html',
  styleUrls: ['./cadastrar-reuniao-celula.component.scss']
})
export class CadastrarReuniaoCelulaComponent implements OnInit {

  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public form: FormGroup;
  public formTwo: FormGroup;

  public membrosLideres = [];
  public igrejaSelecionada: any;

  public comboSemana = [];

  public myControlPalestrante = new FormControl();
  public filteredPalestrante: Observable<string[]>;

  public id: any;
  public reuniao = {} as any;
  public licaoSelecionada: any;
  public pesquisa: boolean = false;
  public enderecos = [];
  public sizeLimitOne: boolean = true;

  public palestrante: any;
  public comboPalestrantes = [];
  public palestrantes = [];

  public membroValue: string;
  public membroSelecionado;
  public myControlMembro = new FormControl();
  public membros = [];
  public filteredMembro: Observable<string[]>;
  public comboMembro = [];

  public comboVisitante = [];
  public visitanteValue: string;
  public visitante;
  public membroVisitante;
  public membrosVisitantes = [];
  public filteredVisitante: Observable<string[]>;
  public myControlVisitante = new FormControl();
  public visitantes = [];

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaValue: string;
  public comboCelulas = [];
  public celulaSelecionada: any;

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;



  constructor(private _emitirEventoService: EmitirEventoService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dateAdapter: DateAdapter<Date>,
    private _membroService: MembroService,
    private _visitanteService: VisitanteService,
    private _datePipe: DatePipe,
    private _service: ReuniaoCelulaService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _serviceRede: RedeService) { }


  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getEmiter();
    this.getComboSemana();
    this.getPalestrantes();
    this.getParams();
    this._buildFormTow();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'horarioInicio': new FormControl('', Validators.required),
      'horarioFim': new FormControl('', Validators.required),
      'dataDaReuniao': new FormControl('', Validators.required),
      'diaDaSemana': new FormControl('', Validators.required),
      'louvor': new FormControl(''),
      'observacao': new FormControl(''),
      'oferta': new FormControl(''),
      'cadeiraBencao': new FormControl(false),
      'presencial': new FormControl(false),
    });
  }

  private _buildFormTow(): void {
    this.formTwo = new FormGroup({
      'outroEndereco': new FormControl(false),
    });
  }



  carregarCelula(id) {

    this._celulaService.getCelulaRede(id).pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      // console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCelula(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filterCelula(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionCelulaChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
    this.getCelulaPessoa(this.celulaSelecionada.id);
    this.carregarMembro(this.celulaSelecionada.id);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'membro-comp') {
        this.membroVisitante = item.data;
      } if (item.type == 'licao-comp') {
        this.licaoSelecionada = item.data;
      }
      if (item.type == 'confirm-dialog-pessoa-membro') {
        this.membros.splice(item.data, 1);
      }
      if (item.type == 'confirm-dialog-pessoa-palestrante') {
        this.palestrantes.splice(item.data, 1);
      }
      if (item.type == 'confirm-dialog-pessoa-visitante') {
        this.visitantes.splice(item.data, 1);
      }
      if (item.type == 'confirm-dialog-pessoa-membro-visitante') {
        this.membrosVisitantes.splice(item.data, 1);
      }

      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }

      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarRede(this.igrejaSelecionada.id);
      }

    });
  }

  getCelulaPessoa(id) {
    this._celulaService.getCelulaPessoa(id).pipe(take(1)).subscribe(item => {
      this.membrosLideres = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getComboSemana() {
    this._celulaService.carregarSemana().subscribe(item => {
      this.comboSemana = item;
      // console.log(item);
    });
  }

  onInputCurrency(event) {
    // console.log(event.target.value)
    this.form.controls['oferta'].patchValue(HelperChurch.currencyValue(event.target.value));
  }

  carregarMembro(id) {
    this._membroService.getMembroCelula(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembro(value: string, lista): string[] {
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
    this.membroSelecionado.tipo = 'MEMBRO';
    this.membros.push(this.membroSelecionado);
  }

  carregarVisitante(dataDaReuniao,celula) {
    let obj = {
      celula:{id:celula.id},
      dataReuniaoCelula:dataDaReuniao
    }
    // console.log(obj)
    this._visitanteService.getVisitanteCelula(obj).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboVisitante = item;
      this.filteredVisitante = this.myControlVisitante.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterVisitante(value, this.comboVisitante))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os visitantes!");
    });
  }

  private _filterVisitante(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  adicionarVistantes() {
    if (!this.visitante) {
      console.log(this.visitante);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let visitanteAdcionado = this.visitantes.find(i => i.nome == this.visitante.nome);
    if (visitanteAdcionado && visitanteAdcionado.nome == this.visitante.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.visitantes.push(this.visitante);
  }

  onSelectionChangedVisitante($event: MatAutocompleteSelectedEvent, option) {
    this.visitante = option;
  }

  adicionarMembrosVisitantes() {
    if (!this.membroVisitante) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroVisitanteAdcionado = this.membrosVisitantes.find(i => i.nome == this.membroVisitante.nome);
    if (membroVisitanteAdcionado && membroVisitanteAdcionado.nome == this.membroVisitante.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membroVisitante.tipo = 'V_OUTRAS_CELULAS';
    this.membrosVisitantes.push(this.membroVisitante);
  }

  salvar() {
    this.preencherObj();
    let mensagem = this.validFields();
    if (mensagem) {
      this._notifierService.notify(AlertType.Error, mensagem);
      return false;
    }
    if (!this.id) {
      this.save();
    } else {
      this.updade();
    }


  }

  preencherObj() {
    let membros = [];
    this.reuniao.horarioInicio = this.form.controls['horarioInicio'].value;
    this.reuniao.horarioFim = this.form.controls['horarioFim'].value;
    this.reuniao.louvor = this.form.controls['louvor'].value;
    this.reuniao.oferta = this.form.controls['oferta'].value;
    this.reuniao.observacao = this.form.controls['observacao'].value;
    this.reuniao.cadeiraBencao = HelperChurch.isBoolean(this.form.controls['cadeiraBencao'].value);
    this.reuniao.dataDaReuniao = this._datePipe.transform(this.form.controls['dataDaReuniao'].value, 'dd/MM/yyyy');
    this.reuniao.diaDaSemana = this.form.controls['diaDaSemana'].value;
    this.reuniao.presencial = HelperChurch.isBoolean(this.form.controls['presencial'].value);
    this.reuniao.visitantes = this.visitantes;
    this.reuniao.outroEndereco =  HelperChurch.isBoolean(this.formTwo.controls['outroEndereco'].value);

    if (this.licaoSelecionada) {
      this.reuniao.licao = { id: this.licaoSelecionada.id };
    }

    if (this.celulaSelecionada) {
      this.reuniao.celula = { id: this.celulaSelecionada.id };
    }
    if (this.membros.length > 0) {
      this.membros.forEach(item => {
        membros.push(item);
      });
    }

    if (this.membrosVisitantes.length > 0) {
      this.membrosVisitantes.forEach(item => {
        membros.push(item);
      });
    }
    if (this.palestrantes.length > 0) {
      this.palestrantes.forEach(item => {
        membros.push(item);
      });
    }
    if (membros.length > 0) {
      this.reuniao.membros = membros;
    }
    if (this.id) {
      this.reuniao.id = this.id;
    }

    if (this.enderecos.length > 0) {
      this.reuniao.enderecos = this.enderecos;
    }
  }

  getPalestrantes() {
    this._membroService.getListMembros().pipe(take(1)).subscribe(item => {
      this.comboPalestrantes = item;
      this.filteredPalestrante = this.myControlPalestrante.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterPalestrantes(value, this.comboPalestrantes))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os palestrantes!");
    });
  }

  private _filterPalestrantes(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  onSelectionChangedPalestrantes($event: MatAutocompleteSelectedEvent, option) {
    // console.log(option)
    this.palestrante = option;
  }

  adicionarPalestrante() {
    if (!this.palestrante) {
      // console.log(this.palestrante);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma palestrante.!");
      return false;
    }
    let palestranteAdicionado = this.palestrantes.find(i => i.nome == this.palestrante.nome);
    if (palestranteAdicionado && palestranteAdicionado.nome == this.palestrante.nome) {
      this._notifierService.notify(AlertType.Error, "Palestrante já adiocionado.!");
      return false;
    }
    this.palestrante.tipo = 'PALESTRANTE';
    this.palestrantes.push(this.palestrante);
  }

  save() {
    this.preencherObj();
    this._service.save(this.reuniao).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  updade() {
    this.preencherObj();
    this._service.update(this.reuniao).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  voltar() {
    this._router.navigate(['/auth/reuniao/pesquisar-reuniao-celula'], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }

  validFields(): string {
    let concat = 'Por favor preencha o campo';
    let concatArray = 'Por favor adicione pelo menos um';
    if (!this.reuniao.dataDaReuniao) {
      return concat + ' Data da reunião!';
    }
    if (!this.reuniao.diaDaSemana) {
      return concat + ' Dia da semana!';
    }
    if (!this.reuniao.horarioInicio) {
      return concat + ' Horário de inicio!';
    }
    if (!this.reuniao.horarioInicio) {
      return concat + ' Horário de fim!';
    }
    if (this.palestrantes.length == 0) {
      return concatArray + ' Palestrante!';
    }
    if (this.membros.length == 0) {
      return concatArray + ' Membro!';
    }
    return null;
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getReuniao(this.id);
      this.pesquisa = true;
    }
  }

  getReuniao(id) {
    this._service.getReuniao(id).pipe(take(1)).subscribe(item => {
      this.form.controls['horarioInicio'].patchValue(item.horarioInicio);
      this.form.controls['horarioFim'].patchValue(item.horarioFim);
      this.form.controls['dataDaReuniao'].patchValue(new Date(item.dataDaReuniaoToDate));
      this.form.controls['diaDaSemana'].patchValue(item.diaDaSemana);
      this.form.controls['louvor'].patchValue(item.louvor);
      this.form.controls['observacao'].patchValue(item.observacao);
      this.form.controls['oferta'].patchValue(item.oferta);
      this.form.controls['cadeiraBencao'].patchValue(item.cadeiraBencao);
      this.form.controls['presencial'].patchValue(item.presencial);
      this.formTwo.controls['outroEndereco'].patchValue(item.outroEndereco);
      if(item.visitantes){
        this.visitantes = item.visitantes;
      }

      if(item.celula){
        this.getCelula(item.celula.id);
        this.carregarVisitante(item.dataDaReuniao,item.celula);
      }

      if(item.licao){
        this.emitirLicao(item.licao);
      }

      if (item.outroEndereco) {
         this.emitirEndereco(item.enderecos);
      }

      if (item.rede) {
        this.redeSelecionada = item.rede;
        this.redeValue = item.rede.nome;
      }

      if(item.igreja){
        this.emitirIgreja(item.igreja)
      }

      item.membros.forEach(i => {

        if (i.tipo == 'MEMBRO') {
          this.membros.push(i);
        }

        if (i.tipo == 'PALESTRANTE') {
          this.palestrantes.push(i);
        }
        if (i.tipo == 'V_OUTRAS_CELULAS') {
          this.membrosVisitantes.push(i);
        }
      });



    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getCelula(id) {
    this._celulaService.getCelula(id).pipe(take(1)).subscribe(item => {
      this.celulaSelecionada = item;
      this.celulaValue = item.nome;
      this.getCelulaPessoa(this.celulaSelecionada.id);
      this.carregarMembro(this.celulaSelecionada.id);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  emitirLicao(item): void {
    this._emitirEventoService.emitir('edit-licao', item);
  }

  emitirEndereco(item): void {
    this._emitirEventoService.emitir("edit-endereco", item);
  }

  emitirIgreja(item): void {
    this._emitirEventoService.emitir("edit-igreja", item);
  }

  dialogRemoverPalestrante(i, item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmPessoaReuniaoComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        tipo: "palestrante",
        item: i
      }
    });
  }

  dialogRemoverMembro(i, item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmPessoaReuniaoComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        tipo: "membro",
        item: i
      }
    });
  }

  dialogRemoverMembroVisitante(i, item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmPessoaReuniaoComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        tipo: "membro-visitante",
        item: i
      }
    });
  }

  dialogRemoverVisitante(i, item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmPessoaReuniaoComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        tipo: "vistante",
        item: i
      }
    });
  }

  carregarRede(id) {

    this._serviceRede.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    this.carregarCelula(this.redeSelecionada.id);
  }

  onDateChange(element){
    let dataDaReuniao =  this._datePipe.transform(element.value, 'dd/MM/yyyy');
    if(this.celulaSelecionada){
      this.carregarVisitante(dataDaReuniao,this.celulaSelecionada);
    }
  }

}
