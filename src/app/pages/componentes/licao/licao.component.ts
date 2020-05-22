import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LicaoService } from '../../../service/licao.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-licao',
  templateUrl: './licao.component.html',
  styleUrls: ['./licao.component.scss']
})
export class LicaoComponent implements OnInit {


  public comboLicao = [];
  public filtered: Observable<string[]>;
  public myControl = new FormControl();
  public licaoSelecionada: any;
  public nomeValue: any;


  constructor(private _service: LicaoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregar();
    this.getEmiter();
  }

  carregar() {

    this._service.getList().pipe(take(1)).subscribe(item => {
      this.comboLicao = item;
      // console.log(item);
      this.filtered = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboLicao))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.tema.toLowerCase().includes(filterValue));
  }

  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.licaoSelecionada = option;
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("licao-comp", this.licaoSelecionada);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.type);
      if (item.type == 'licao') {
        this.licaoSelecionada = item.data;
        this.nomeValue = item.data;
      }
      if (item.type == 'clear') {
        this.licaoSelecionada = '';
        this.nomeValue = '';
      }
    });
  }
}
