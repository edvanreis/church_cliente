import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { JustificativaAusenciaService } from '../../../service/justificativa-ausencia.service';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-justificativas',
  templateUrl: './dialog-confirm-justificativas.component.html',
  styleUrls: ['./dialog-confirm-justificativas.component.scss']
})
export class DialogConfirmJustificativasComponent implements OnInit {

  public justificativasAusenciaIds = [];

  constructor(public dialogRef: MatDialogRef<DialogConfirmJustificativasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: JustificativaAusenciaService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-justificativa', '');
  }

  confirmar() {
    this.data.faltas.forEach(element => {
      this.justificativasAusenciaIds.push(element.justificativaAusenciaId);
    });
    this._service.remove({
      justificativasAusenciaIds: this.justificativasAusenciaIds
      , faltas: this.data.faltas
    }) .pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.setEmiter();
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
  }


}
