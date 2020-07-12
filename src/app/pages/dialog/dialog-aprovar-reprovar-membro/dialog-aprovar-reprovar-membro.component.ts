import { Component, OnInit, Inject } from '@angular/core';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { PessoaService } from '../../../service/pessoa.service';

@Component({
  selector: 'app-dialog-aprovar-reprovar-membro',
  templateUrl: './dialog-aprovar-reprovar-membro.component.html',
  styleUrls: ['./dialog-aprovar-reprovar-membro.component.scss']
})
export class DialogAprovarReprovarMembroComponent implements OnInit {

  public titulo: string;
  public mensagem: string;
  public icon: string;
  public observacao: string;

  constructor(public dialogRef: MatDialogRef<DialogAprovarReprovarMembroComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: PessoaService) { }

  ngOnInit() {
    console.log(this.data);
    this.getTitulo();
    this.getMensagem();
  }

  getTitulo() {
    if (this.data.reprovar) {
      this.titulo = 'Reprovar';
      this.icon = 'not_interested';
    } else {
      this.titulo = 'Aprovar';
      this.icon = 'done';
    }
  }

  getMensagem() {
    if (this.data.reprovar) {
      this.mensagem = 'Deseja Realmente reprovar este membro';
    } else {
      this.mensagem = 'Deseja Realmente aprovar este membro';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmar() {
    if (this.data.reprovar) {
      this.reprovar();
    } else if (this.data.aprovarReprovado) {
      this.aprovarReprovado();
    } else {
      this.aprovar();
    }
  }

  aprovar() {
    this._service.aprovar(this.data.id).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.message);
    });
  }

  aprovarReprovado() {
    this._service.aprovarReprovado(this.data.id).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.message);
    });
  }

  reprovar() {
    if (!this.validField()) {
      return;
    }
    this._service.reprovar(this.setObj()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.message);
    });
  }

  setObj() {
    return {
      id: this.data.id,
      observacao: this.observacao
    }
  }

  validField(): boolean {
    if (!this.observacao && !this.data.aprovar) {
      this._notifierService.notify(AlertType.Error, "Campo observação obrigatório!");
      return false;
    } else {
      return true;
    }
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('dialog-aprovar-reprovar-membro', '');
  }
}
