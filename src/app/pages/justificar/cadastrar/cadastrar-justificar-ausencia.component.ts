import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CelulaService } from '../../../service/celula.service';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { PessoaService } from '../../../service/pessoa.service';
import { FaltasService } from '../../../service/faltas.service';

@Component({
  selector: 'app-cadastrar-justificar-ausencia',
  templateUrl: './cadastrar-justificar-ausencia.component.html',
  styleUrls: ['./cadastrar-justificar-ausencia.component.scss']
})
export class CadastrarJustificarAusenciaComponent implements OnInit {

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaValue: string;
  public comboCelulas = [];
  public celulaSelecionada: any;
  public rede: any;
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public membroSelecionado;
  public faltas = [];

  constructor(private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _pessoaService: PessoaService,
    private _faltasService: FaltasService) { }

  ngOnInit() {
    this.carregarCelula();
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
    this.carregarMembro(this.celulaSelecionada.id);
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
    this.membroSelecionado = option;
    this.getCelulaPessoa(this.membroSelecionado.id); 
  }

  getCelulaPessoa(id) {
    this._faltasService.getFaltasByPessoa(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.faltas = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }



}
