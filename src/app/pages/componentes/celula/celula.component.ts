import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CelulaService } from '../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-celula',
  templateUrl: './celula.component.html',
  styleUrls: ['./celula.component.scss']
})
export class CelulaComponent implements OnInit {

  public comboCelulas = [];
  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaSelecionada: any;
  public nomeValue: any;

  constructor(private _service: CelulaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarIgrejas();
    this.getEmiter();
  }

  carregarIgrejas() {

    this._service.getList().pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("celula-comp", this.celulaSelecionada);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'celula') {
        this.celulaSelecionada = item.data;
        this.nomeValue = item.data;
      }
      if (item.type == 'save-ok') {
        this.celulaSelecionada = '';
        this.nomeValue = '';
      }

    });
  }

}
