import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CelulaService } from '../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { CargoService } from '../../../service/cargo.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {


  public comboCargo = [];
  public filteredCargo: Observable<string[]>;
  public myControlCargo = new FormControl();
  public cargoSelecionado;
  public cargos$: Observable<any[]>;
  public cargos = [];
  @Input('idAssociado') idAssociado;

  constructor(private _service: CargoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog) { }

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
        this.setEmiter();
      }
      if (item.type == 'confirm-dialog-cargo') {
        this.cargos.splice(item.data, 1);
        this.setEmiter();
      }
    });
  }

  adicionar() {
    if (!this.cargoSelecionado) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha um cargo.!");
      return false;
    }
    this.cargos.push(this.cargoSelecionado);
    this.setEmiter();
  }

  dialogRemover(i, item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        controller: 'cargo',
        item: item,
        idAssociado: this.idAssociado,
        index: i
      }
    });
  }


}
