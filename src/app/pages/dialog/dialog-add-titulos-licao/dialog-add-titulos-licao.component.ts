import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { LicaoService } from '../../../service/licao.service';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-add-titulos-licao',
  templateUrl: './dialog-add-titulos-licao.component.html',
  styleUrls: ['./dialog-add-titulos-licao.component.scss']
})
export class DialogAddTitulosLicaoComponent implements OnInit {

  public tema: any;
  constructor(public dialogRef: MatDialogRef<DialogAddTitulosLicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: LicaoService) { }

  ngOnInit() {
    console.log(this.data)
    this.getTitulo();
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('licao-titulo-dialog', '');
  }

  getTitulo(): void {
    if (this.data) {
      this.data.dataSource.pipe(take(1)).subscribe(map => {
        this.tema = map.tema;
      });
    }
  }

  salvar() {
    if (this.data && this.data.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this._service.save({ tema: this.tema }).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, "Tema salvo com sucesso");
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  update() {
    this._service.update({ id: this.data.id, tema: this.tema }).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, "Tema atualizado com sucesso");
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

}
