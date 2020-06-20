import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { StatusService } from '../../../service/status.service';

const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' }
];

@Component({
  selector: 'app-dialog-ativar-inativar',
  templateUrl: './dialog-ativar-inativar.component.html',
  styleUrls: ['./dialog-ativar-inativar.component.scss']
})
export class DialogAtivarInativarComponent implements OnInit {


  public form: FormGroup;
  public comboStatus = ELEMENT_DATA;
  public status;
  public mensagem;

  constructor(public dialogRef: MatDialogRef<DialogAtivarInativarComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: StatusService) { }

  ngOnInit() {
    this._buildForm();
    console.log(this.data)
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'status': new FormControl(''),
      'observacao': new FormControl('')
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmar() {
    let obj = {
      id: this.data.id,
      observacao: this.form.controls['observacao'].value
    }
    if (!obj.observacao) {
      this._notifierService.notify(AlertType.Error, "Campo observação obrigatório!");
      return false;
    }
    console.log(obj)
    if (this.form.controls['status'].value == 'A') {
      this.ativar(obj);
    } else {
      this.inativar(obj);
    }


  }


  setEmiter(): void {
    this._emitirEventoService.emitir('status', 'status');
  }

  changeStatus(e) {
    this.status = e.value;
    if (this.status == 'A') {
      this.mensagem = this.memsagemAtivar(this.data.controller);
    } else {
      this.mensagem = this.memsagemInativar(this.data.controller);
    }
  }

  ativar(obj) {
    this._service.ativar(obj, this.data.controller).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.message);
    });
  }

  inativar(obj) {
    this._service.inativar(obj, this.data.controller).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.message);
    });
  }

  memsagemAtivar(controller) {
    switch (controller) {
      case 'celula':
        return 'Deseja Realmente Ativar esta Célula?';
      case 'pessoa':
        return 'Deseja Realmente Ativar este Membro?';
      case 'igreja':
        return 'Deseja Realmente Ativar esta Igreja?';
        case 'grupo':
        return 'Deseja Realmente Ativar este Grupo?';
      default:
        break;
    }
  }

  memsagemInativar(controller) {
    switch (controller) {
      case 'celula':
        return 'Deseja Realmente Inativar esta Célula?';
      case 'pessoa':
        return 'Deseja Realmente Inativar este Membro?';
      case 'igreja':
        return 'Deseja Realmente Inativar esta Igreja?';
        case 'grupo':
          return 'Deseja Realmente Ativar este Grupo?';
      default:
        break;
    }
  }

}
