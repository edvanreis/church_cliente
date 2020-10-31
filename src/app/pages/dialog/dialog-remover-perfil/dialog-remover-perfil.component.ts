import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilService } from '../../../service/perfil.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-remover-perfil',
  templateUrl: './dialog-remover-perfil.component.html',
  styleUrls: ['./dialog-remover-perfil.component.scss']
})
export class DialogRemoverPerfilComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogRemoverPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _permissoesService:PerfilService,
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
