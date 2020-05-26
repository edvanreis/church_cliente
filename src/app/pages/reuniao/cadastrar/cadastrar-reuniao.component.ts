import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { DateAdapter, MatAutocompleteSelectedEvent } from '@angular/material';
import { HelperChurch } from '../../../helper/helper.church';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { PessoaService } from '../../../service/pessoa.service';

@Component({
  selector: 'app-cadastrar-reuniao',
  templateUrl: './cadastrar-reuniao.component.html',
  styleUrls: ['./cadastrar-reuniao.component.scss']
})
export class CadastrarReuniaoComponent implements OnInit {

  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public form: FormGroup;
  public celulaSelecionada: any;
  public membrosLideres = [];
  public membros = [];
  public visitantes = [];
  public comboSemana = [];
  public myControlMembro = new FormControl();
  public myControlVisitante= new FormControl();
  public comboMembro = [];
  public comboVisitante = [];
  public filteredMembro: Observable<string[]>;
  public filteredVisitante: Observable<string[]>;
  public membroValue: string;
  public visitanteValue: string;
  public membro;
  public visitante;
  public membroVisitante;
  public membrosVisitantes = [];

  constructor(private _emitirEventoService: EmitirEventoService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dateAdapter: DateAdapter<Date>,
    private _pessoaService: PessoaService) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getEmiter();
    this.getComboSemana();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'horaInicio': new FormControl(''),
      'horaFim': new FormControl(''),
      'dataDaReuniao': new FormControl(''),
      'diaSemana': new FormControl(''),
      'louvor': new FormControl(''),
      'observacao': new FormControl(''),
      'oferta': new FormControl(''),
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'celula-comp') {
        this.celulaSelecionada = item.data;
        this.getCelulaPessoa(this.celulaSelecionada.id);
        this.carregarMembro(this.celulaSelecionada.id);
        this.carregarVisitante(this.celulaSelecionada.id);
      }

      if (item.type == 'membro-comp') {
        this.membroVisitante = item.data;
        console.log(this.membroVisitante)
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
    // console.log(option)
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
    if (this.membros.length != 0) {
      this.membro.codigo = this.membros[this.membros.length - 1].codigo + 1;
    } else {
      this.membro.codigo = 1;
    }
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
    if (this.visitantes.length != 0) {
      this.visitante.codigo = this.membros[this.visitantes.length - 1].codigo + 1;
    } else {
      this.visitante.codigo = 1;
    }
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
    if (this.membrosVisitantes.length != 0) {
      this.membroVisitante.codigo = this.membrosVisitantes[this.membrosVisitantes.length - 1].codigo + 1;
    } else {
      this.membroVisitante.codigo = 1;
    }
    this.membrosVisitantes.push(this.membroVisitante);
  }


}
