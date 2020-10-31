import { Component, OnInit, Inject } from '@angular/core';
import { LicaoService } from '../../../service/licao.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-confirm-licao',
  templateUrl: './dialog-confirm-licao.component.html',
  styleUrls: ['./dialog-confirm-licao.component.scss']
})
export class DialogConfirmLicaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmLicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: LicaoService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-licao', '');
  }

  confirmar() {
      this._service.remove(this.data.id).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, "Item removido com sucesso!");
        this.setEmiter();
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
    }



}
