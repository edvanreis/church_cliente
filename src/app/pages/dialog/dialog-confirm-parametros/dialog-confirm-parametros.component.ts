import { ParametrosService } from './../../../service/parametros.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-confirm-parametros',
  templateUrl: './dialog-confirm-parametros.component.html',
  styleUrls: ['./dialog-confirm-parametros.component.scss']
})
export class DialogConfirmParametrosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmParametrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: ParametrosService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-parametro', '');
  }

  confirmar() {
    this._service.remove(this.data.id).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.close();
      this.setEmiter();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });

  }


}
