import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AgendamentoPessoaService } from '../../../service/agendamento-pessoa.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-justificar-agendamento',
  templateUrl: './dialog-justificar-agendamento.component.html',
  styleUrls: ['./dialog-justificar-agendamento.component.scss']
})
export class DialogJustificarAgendamentoComponent implements OnInit {

  public observacao:string;

  constructor(public dialogRef: MatDialogRef<DialogJustificarAgendamentoComponent>,
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
    this._emitirEventoService.emitir('confirm-dialog-justificar-agendamento', '');
  }

  confirmar() {
    if(!this.observacao){
      this._notifierService.notify(AlertType.Error, "Por favor digite uma jutificativa!");
      return false;
    }
    let obj = {
      id:this.data.id,
      observacao:this.observacao
    }
    this._service.justificarFaltaAgendamento(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, "Item justicativa com sucesso!");
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

}
