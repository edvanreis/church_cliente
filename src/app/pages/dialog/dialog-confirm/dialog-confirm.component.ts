import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { ConfirmService } from '../../../service/confirm.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
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
    this._emitirEventoService.emitir('confirm-dialog-' + this.data.controller, this.data.item);
  }

  confirmar() {
    if (!this.data.idAssociado) {
      this.setEmiter();
      this.close();
    } else {
      this._service.remove(this.data.item.id, this.data.controller).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.setEmiter();
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
    }
  }


}
