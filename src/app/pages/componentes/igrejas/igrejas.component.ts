import { Component, OnInit } from '@angular/core';
import { IgrejaService } from '../../../service/igreja.service';
import { map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertType } from '../../../model/alert-type';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-igrejas',
  templateUrl: './igrejas.component.html',
  styleUrls: ['./igrejas.component.scss']
})
export class IgrejasComponent implements OnInit {

  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaSelecionada: any;
  public nomeValue: any;

  constructor(private _igrejaService: IgrejaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarIgrejas();
    this.getEmiter();
  }

  carregarIgrejas() {

    this._igrejaService.getList().pipe(take(1)).subscribe(item => {
      this.comboIgrejas = item;
      console.log(item);
      this.filteredIgreja = this.myControlIgreja.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboIgrejas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChanged($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("igreja-comp", this.igrejaSelecionada);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'igreja') {
        this.igrejaSelecionada = item.data;
        this.nomeValue = item.data;
      }
      if (item.type == 'save-ok') {
        this.igrejaSelecionada = '';
        this.nomeValue = '';
      }

    });
  }
}
