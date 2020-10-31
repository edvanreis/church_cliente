import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReuniaoService } from '../../../service/reuniao.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-pessoa-reuniao',
  templateUrl: './dialog-confirm-pessoa-reuniao.component.html',
  styleUrls: ['./dialog-confirm-pessoa-reuniao.component.scss']
})
export class DialogConfirmPessoaReuniaoComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogConfirmPessoaReuniaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: ReuniaoService) { }

  ngOnInit() {
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-pessoa-'+this.data.tipo, this.data.item);
  }

  confirmar() {

    let obj = {
      id: this.data.id,
      idPessoa: this.data.idPessoa
    }

    this._service.removeByPessoaObj(obj)
      .pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
        this.close();
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
      this.setEmiter();
  }

}
