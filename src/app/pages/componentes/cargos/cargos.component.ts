import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CelulaService } from '../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { CargoService } from '../../../service/cargo.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

 
  public comboCargo = [];
  public filteredCargo: Observable<string[]>;
  public myControlCargo = new FormControl();
  public cargoSelecionado: any;
  public cargos$: Observable<any[]>;
  public cargos =[];

  constructor(private _service: CargoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarCargos();
    this.getEmiter();
  }
 
  carregarCargos() {
    this.cargos$ = this._service.getList();
  }
  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.cargoSelecionado = option;
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("cargos-comp", this.cargos);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.cargoSelecionado = null;
        this.cargos = [];
      }
      if (item.type == 'edit-cargos') {
        this.cargos = item.data;
        // console.log(this.etapas)
        this.setEmiter();
      }
    }); 
  }

  adicionar() {
    if (!this.cargoSelecionado) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma etapa.!");
      return false;
    }
    let etapaAdicionada = this.cargos.find(i=>i.nome==this.cargoSelecionado.nome);
    if(etapaAdicionada &&  etapaAdicionada.nome == this.cargoSelecionado.nome){
      this._notifierService.notify(AlertType.Error, "Etapa já adiocionada.!");
      return false;
    }
    this.cargos.push(this.cargoSelecionado);
    this.setEmiter();
  }

  
  remover(index): void {
    this.cargos.splice(index, 1);
  }



}
