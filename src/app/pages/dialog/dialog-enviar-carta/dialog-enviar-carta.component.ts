import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { FileService } from '../../../service/file.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dialog-enviar-carta',
  templateUrl: './dialog-enviar-carta.component.html',
  styleUrls: ['./dialog-enviar-carta.component.scss']
})
export class DialogEnviarCartaComponent implements OnInit {

  public selectedFiles: FileList
  public currentFileUpload: File;

  constructor(public dialogRef: MatDialogRef<DialogEnviarCartaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _fileService:FileService,
    private _notifierService: NotifierService) { }

  ngOnInit() { }

  close(): void {
    this.dialogRef.close();
  }


  /**
  * Preenche o objeto this.currentFileUpload com o arquivo carregado
  * @param event 
 */
  upload(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = event.target.files.item(0)
  }

  confirmar() {
    if (this.currentFileUpload) {
      this._fileService.uploadCarta(this.currentFileUpload,this.data.id).pipe(take(1)).subscribe(item => {
        // this.emitiClear();
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
    }
  }






}
