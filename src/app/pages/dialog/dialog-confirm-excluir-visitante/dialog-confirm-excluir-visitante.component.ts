import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { PessoaService } from '../../../service/pessoa.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-excluir-visitante',
  templateUrl: './dialog-confirm-excluir-visitante.component.html',
  styleUrls: ['./dialog-confirm-excluir-visitante.component.scss']
})
export class DialogConfirmExcluirVisitanteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmExcluirVisitanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: PessoaService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-excluir-visitante','');
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
