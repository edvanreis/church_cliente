import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { AgendamentoService } from '../../../service/agendamento.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-agandamento',
  templateUrl: './dialog-confirm-agandamento.component.html',
  styleUrls: ['./dialog-confirm-agandamento.component.scss']
})
export class DialogConfirmAgandamentoComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogConfirmAgandamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: AgendamentoService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-remover-agendamento','');
  }

  confirmar() {
      this._service.remove(this.data.id).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.setEmiter();
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });

  }

}
