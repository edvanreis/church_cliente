import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mult-select-etapa-visao',
  templateUrl: './mult-select-etapa-visao.component.html',
  styleUrls: ['./mult-select-etapa-visao.component.scss']
})
export class MultSelectEtapaVisaoComponent implements OnInit {

  public etapa$: Observable<any[]>;
  public etapaSelecionada: any;
  public etapas = [];
  public etapasSelecionadas = [];
  @Input('idAssociado') idAssociado;

  public myControl = new FormControl();
  public filtered: Observable<string[]>;
  public checkedList = [];
  public checked: boolean = false;

  public editar:boolean = false;

  constructor(private _service: EtapaVisaoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.carregar();
    this.getEmiter();
  }

  carregar() {
    this._service.getList().pipe(take(1)).subscribe(item => {
      this.etapas = item;
      this.filtered = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
        if(this.editar){
          this.carregarDadosEditar();
        }
    });
  }

  carregarDadosEditar() {
    this.checkedList = [];
    for (var i = 0; i < this.etapas.length; i++) {
      this.etapas[i].checked = true;
      this.checkedList.push(this.etapas[i]);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.etapas.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onCheckboxChange(option, event) {
    // console.log(this.checkedList);
    if (event.target.checked) {
      this.checkedList.push(option);
    } else {
      for (var i = 0; i < this.etapas.length; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    this.emiter();
  }

  emiter() {
    this._emitirEventoService.emitir("mult-select-etapas-visao", this.checkedList);
  }

  marcarDesmarcar() {
    if (this.checked)
      this.limparTodos();
    else
      this.marcarTodos();
  }

  limparTodos() {
    this.checked = false;
    this.checkedList = [];
    for (var i = 0; i < this.etapas.length; i++) {
      this.etapas[i].checked = false;
    }
    this.emiter();
  }

  marcarTodos() {
    this.checked = true;
    this.checkedList = [];
    for (var i = 0; i < this.etapas.length; i++) {
      this.etapas[i].checked = true;
    }
    this.checkedList = this.etapas;
    this.emiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'edit-mult-select-etapas') {
        for (let i = 0; i < item.data.length; i++) {
          let etapa = {} as any;
          etapa.id = item.data[i].id;
          etapa.nome = item.data[i].nome;
          this.etapas.push(etapa);
          this.editar = true;
        }
      }
    });
  }

}
