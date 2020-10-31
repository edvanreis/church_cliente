import { MembroService } from './../../../service/membro.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-excluir-pessoa',
  templateUrl: './dialog-confirm-excluir-pessoa.component.html',
  styleUrls: ['./dialog-confirm-excluir-pessoa.component.scss']
})
export class DialogConfirmExcluirPesssoaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmExcluirPesssoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: MembroService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-excluir-pessoa','');
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
