import { Component, OnInit } from '@angular/core';
import { RedeService } from '../../../service/rede.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss']
})
export class RedesComponent implements OnInit {
 
  public comboRede = [];
  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public redeSelecionada: any;
  public nomeValue: any;

  constructor(private _redeService: RedeService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarCelula();
    this.getEmiter();
  }

  carregarCelula() {

    this._redeService.getList().pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.type);
      if (item.type == 'add') {
        this.redeSelecionada = item.data;
        this.nomeValue = item.data;
      }
      if (item.type == 'clear') {
        this.redeSelecionada = '';
        this.nomeValue = '';
      }
      if (item.type == 'edit-rede') {
        this.redeSelecionada = item.data;
        this.nomeValue = item.data.nome;
      }

    });
  }

  onSelectionChanged($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("rede-comp", this.redeSelecionada);
  }



}
