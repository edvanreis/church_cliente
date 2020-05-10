import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-etapa-visao',
  templateUrl: './etapa-visao.component.html',
  styleUrls: ['./etapa-visao.component.scss']
})
export class EtapaVisaoComponent implements OnInit {

  public etapa$: Observable<any[]>;
  public etapa: any;
  public etapas = [];

  constructor(private _etapaVisao: EtapaVisaoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.getComboEtapaVisao();
    this.getEmiter();
  }


  getComboEtapaVisao() {
    this.etapa$ = this._etapaVisao.getList();
  }


  adicionar() {
    if (!this.etapa) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma etapa.!");
      return false;
    }
    let etapaAdicionada = this.etapas.find(i => i.nome == this.etapa.nome);
    if (etapaAdicionada && etapaAdicionada.nome == this.etapa.nome) {
      this._notifierService.notify(AlertType.Error, "Etapa já adiocionada.!");
      return false;
    }
    if (this.etapas.length != 0) {
      this.etapa.codigo = this.etapas[this.etapas.length - 1].codigo + 1;
    } else {
      this.etapa.codigo = 1;
    }
    this.etapas.push(this.etapa);
    this.setEmiter();
  }


  remover(index): void {
    this.etapas.splice(index, 1);
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.etapa = null;
        this.etapas = [];
      }
      if (item.type == 'edit-etapa-visao') {
        for (let i = 0; i < item.data.length; i++) {
          let etapa = {} as any;
          etapa.codigo = i + 1;
          etapa.id = item.data[i].id;
          etapa.nome = item.data[i].nome;
          this.etapas.push(etapa)
          this.setEmiter();
        }
      }
      if (item.type == 'confirm-dialog-etapaVisao') {
        this.etapas.splice(item.data, 1);
        this.setEmiter();
      }
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('etapas-comp', this.etapas);
  }

  dialogRemover(item) {
    // console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        controller: 'etapaVisao',
        item: item
      }
    });
  }

}
