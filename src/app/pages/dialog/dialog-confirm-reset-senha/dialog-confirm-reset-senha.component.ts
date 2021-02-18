import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { UserService } from '../../../service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-confirm-reset-senha',
  templateUrl: './dialog-confirm-reset-senha.component.html',
  styleUrls: ['./dialog-confirm-reset-senha.component.scss']
})
export class DialogConfirmResetSenhaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmResetSenhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: UserService) { }

  ngOnInit() {
    console.log(this.data)
  }


  close(): void {
    this.dialogRef.close();
  }

  confirmar() {
    this._service.resetarSenha(this.data.id).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });

  }

}
