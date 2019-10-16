import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PermissoesService } from '../../../service/permissoes.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-dialog-remover',
  templateUrl: './dialog-remover.component.html',
  styleUrls: ['./dialog-remover.component.scss']
})
export class DialogRemoverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRemoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _permissoesService:PermissoesService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }

  

  remove() {
    this._permissoesService.remove(this.data.id).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, "Item removido com sucesso!");
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }
  
  setEmiter(): void {
    this._emitirEventoService.emitir('remove', 'remove');
  }


}
