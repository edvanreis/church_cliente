import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { PessoaService } from '../../../service/pessoa.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-dialog-reativar-pessoa',
  templateUrl: './dialog-reativar-pessoa.component.html',
  styleUrls: ['./dialog-reativar-pessoa.component.scss']
})
export class DialogReativarPessoaComponent implements OnInit {

  public observacao: any;

  constructor(public dialogRef: MatDialogRef<DialogReativarPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service:PessoaService) { }

  ngOnInit() {
  }


  close(): void {
    this.dialogRef.close();
  }

  confirmar() {
    if(!this.observacao){
      this._notifierService.notify(AlertType.Error, "Campo observação obrigatório!");
      return false;
    }
    let obj = {
      id:this.data.id,
      observacao:this.observacao
    }
    this._service.reativarPessoa(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);   
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('reativar', 'reativar');
  }

}
