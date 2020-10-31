import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { AgendamentoPessoaService } from '../../../service/agendamento-pessoa.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-agendamento-confirm',
  templateUrl: './dialog-agendamento-confirm.component.html',
  styleUrls: ['./dialog-agendamento-confirm.component.scss']
})
export class DialogAgendamentoConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAgendamentoConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: AgendamentoPessoaService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('dialog-agendamento-confirm', '');
  }

  confirmar() {

     let obj = {
       cpf:this.data.cpf,
       agendamento:{id:this.data.id}
     }
      this._service.remove(obj).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.setEmiter();
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
  }

}
