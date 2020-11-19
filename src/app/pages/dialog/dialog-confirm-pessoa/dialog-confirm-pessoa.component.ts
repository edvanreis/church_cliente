import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { ConfirmService } from '../../../service/confirm.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-dialog-confirm-pessoa',
  templateUrl: './dialog-confirm-pessoa.component.html',
  styleUrls: ['./dialog-confirm-pessoa.component.scss']
})
export class DialogConfirmPessoaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: ConfirmService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-pessoa-'+this.data.controller, this.data.item);
  }

  confirmar() {
    let controller = this.data.controller;
    let obj = {
      id: this.data.id,
      membroId: this.data.idPessoa
    }
    this._service.removerPessoa(obj,controller)
      .pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
      this.setEmiter();
  }

}
