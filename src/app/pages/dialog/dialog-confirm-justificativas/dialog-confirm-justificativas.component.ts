import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dialog-confirm-justificativas',
  templateUrl: './dialog-confirm-justificativas.component.html',
  styleUrls: ['./dialog-confirm-justificativas.component.scss']
})
export class DialogConfirmJustificativasComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<DialogConfirmJustificativasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-justificativa','');
  }

}
