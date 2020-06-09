import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { DateAdapter, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { HelperChurch } from '../../../helper/helper.church';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { PessoaService } from '../../../service/pessoa.service';
import { ReuniaoService } from '../../../service/reuniao.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';
import { DialogConfirmPessoaReuniaoComponent } from '../../dialog/dialog-confirm-pessoa-reuniao/dialog-confirm-pessoa-reuniao.component';

@Component({
  selector: 'app-cadastrar-reuniao',
  templateUrl: './cadastrar-reuniao.component.html',
  styleUrls: ['./cadastrar-reuniao.component.scss']
})
export class CadastrarReuniaoComponent implements OnInit {

  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public form: FormGroup;
  public formTow: FormGroup;
  public celulaSelecionada: any;
  public membrosLideres = [];
  public membros = [];
  public visitantes = [];
  public comboSemana = [];
  public myControlMembro = new FormControl();
  public myControlPalestrante = new FormControl();
  public myControlVisitante = new FormControl();
  public comboMembro = [];
  public comboVisitante = [];
  public filteredMembro: Observable<string[]>;
  public filteredPalestrante: Observable<string[]>;
  public filteredVisitante: Observable<string[]>;
  public membroValue: string;
  public visitanteValue: string;
  public membro;
  public visitante;
  public membroVisitante;
  public membrosVisitantes = [];
  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaValue: string;
  public comboCelulas = [];
  public rede: any;
  public id: any;
  public reuniao = {} as any;
  public licaoSelecionada: any;
  public palestrante: any;
  public comboPalestrantes = [];
  public palestrantes = [];
  public pesquisa: boolean = false;

  public enderecos = [];
  public sizeLimitOne: boolean = true;


  constructor(private _emitirEventoService: EmitirEventoService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dateAdapter: DateAdapter<Date>,
    private _pessoaService: PessoaService,
    private _datePipe: DatePipe,
    private _service: ReuniaoService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _dialog: MatDialog) { }


  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.carregarCelula();
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
      'observacao': new FormControl('',Validators.required),
      'oferta': new FormControl(''),
      'cadeiraBencao': new FormControl(false),
    });
  }

  private _buildFormTow(): void {
    this.formTow = new FormGroup({
      'realizado': new FormControl(true),
    });
  }



  carregarCelula() {

    this._celulaService.getList().pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
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
    this.rede = this.celulaSelecionada.rede.nome;
    this.getCelulaPessoa(this.celulaSelecionada.id);
    this.carregarMembro(this.celulaSelecionada.id);
    this.carregarVisitante(this.celulaSelecionada.id);
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
    this._pessoaService.getMembroCelula(id).pipe(take(1)).subscribe(item => {
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
    this.membro = option;
  }

  adicionarMembro() {
    if (!this.membro) {
      console.log(this.membro);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membro.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membro.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membro.tipo = 'MEMBRO';
    this.membros.push(this.membro);
  }

  carregarVisitante(id) {
    this._pessoaService.getVisitanteCelula(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboVisitante = item;
      this.filteredVisitante = this.myControlVisitante.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterVisitante(value, this.comboVisitante))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
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
    this.visitante.tipo = 'VISITANTE';
    this.visitantes.push(this.visitante);
  }

  onSelectionChangedVisitante($event: MatAutocompleteSelectedEvent, option) {
    // console.log(option)
    this.visitante = option;
  }

  adicionarMembrosVisitantes() {
    if (!this.membroVisitante) {
      console.log(this.membroVisitante);
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
    this.getObj();
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

  getObj() {
    let pessoas = [];
    this.reuniao.horarioInicio = this.form.controls['horarioInicio'].value;
    this.reuniao.horarioFim = this.form.controls['horarioFim'].value;
    this.reuniao.louvor = this.form.controls['louvor'].value;
    this.reuniao.oferta = this.form.controls['oferta'].value;
    this.reuniao.observacao = this.form.controls['observacao'].value;
    this.reuniao.cadeiraBencao = HelperChurch.isBoolean(this.form.controls['cadeiraBencao'].value);
    this.reuniao.dataDaReuniao = this._datePipe.transform(this.form.controls['dataDaReuniao'].value, 'dd/MM/yyyy');
    this.reuniao.diaDaSemana = this.form.controls['diaDaSemana'].value;

    if (this.licaoSelecionada) {
      this.reuniao.licao = { id: this.licaoSelecionada.id };
    }

    if (this.celulaSelecionada) {
      this.reuniao.celula = { id: this.celulaSelecionada.id };
    }
    if (this.membros.length > 0) {
      this.membros.forEach(item => {
        pessoas.push(item);
      });
    }
    if (this.visitantes.length > 0) {
      this.visitantes.forEach(item => {
        pessoas.push(item);
      });
    }
    if (this.membrosVisitantes.length > 0) {
      this.membrosVisitantes.forEach(item => {
        pessoas.push(item);
      });
    }
    if (this.palestrantes.length > 0) {
      this.palestrantes.forEach(item => {
        pessoas.push(item);
      });
    }
    if (pessoas.length > 0) {
      this.reuniao.pessoas = pessoas;
    }
    if (this.id) {
      this.reuniao.id = this.id;
    }

    if (this.enderecos.length > 0) {
      this.reuniao.enderecos = this.enderecos;
    }
  }

  getPalestrantes() {
    this._pessoaService.getListMembros().pipe(take(1)).subscribe(item => {
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
    this.getObj();
    this._service.save(this.reuniao).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  updade() {
    this.getObj();
    this._service.update(this.reuniao).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  voltar() {
    this._router.navigate(['/auth/reuniao/pesquisar'], {
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
    if (!this.reuniao.observacao) {
      return concat + ' Nota/Observação!';
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
      console.log(item)
      this.form.controls['horarioInicio'].patchValue(item.horarioInicio);
      this.form.controls['horarioFim'].patchValue(item.horarioFim);
      this.form.controls['dataDaReuniao'].patchValue(new Date(item.dataDaReuniaoToDate));
      this.form.controls['diaDaSemana'].patchValue(item.diaDaSemana);
      this.form.controls['louvor'].patchValue(item.louvor);
      this.form.controls['observacao'].patchValue(item.observacao);
      this.form.controls['oferta'].patchValue(item.oferta);
      this.form.controls['cadeiraBencao'].patchValue(item.cadeiraBencao);
      this.emitirLicao(item.licao);
      this.getCelula(item.celula.id);
      if(item.enderecos){
        this.formTow.controls['realizado'].patchValue(false);
        this.emitirEndereco(item.enderecos);
      }

      item.pessoas.forEach(i => {
        if (i.tipo == 'MEMBRO') {
          this.membros.push(i);
        }
        if (i.tipo == 'VISITANTE') {
          this.visitantes.push(i);
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
      this.rede = this.celulaSelecionada.rede.nome;
      this.getCelulaPessoa(this.celulaSelecionada.id);
      this.carregarMembro(this.celulaSelecionada.id);
      this.carregarVisitante(this.celulaSelecionada.id);
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

}
